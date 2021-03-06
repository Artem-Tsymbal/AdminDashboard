import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTstrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/userModel";
import generateMD5 from "../utils/generateHash";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await UserModel.findOne({
        $or: [{ email: username }, { username }],
      })
        .select("+password")
        .exec();

      if (!user) {
        return done(null, false);
      }

      if (user.password === generateMD5(password + process.env.SECRET_KEY)) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "345",
      jwtFromRequest: ExtractJwt.fromHeader("token"),
    },
    async (payload, done) => {
      try {
        const user = await UserModel.findById(payload.data._id).exec();

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    err ? done(err) : done(null, user);
  });
});

export default passport;

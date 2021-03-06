import { ApiError } from "../exceptions/apiError";

export function errorMiddleware(err, _req, res, next) {
  if (err instanceof ApiError) {
    return res
      .sstatus(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Unknown error" });
}

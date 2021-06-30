import crypto from "crypto";

export default function generateMD5(value) {
  return crypto.createHash("md5").update(value).digest("hex");
}

const jwt = require("jsonwebtoken");
const { UNAUTHORIZED_ERROR_CODE } = require("../utils/errors");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .json({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      _id: payload._id,
      ...payload,
    };
    return next();
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR_CODE)
      .json({ message: "Invalid token" });
  }
};

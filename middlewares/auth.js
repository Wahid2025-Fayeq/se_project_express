const jwt = require("jsonwebtoken");

const UnauthorizedError = require("../errors/UnauthorizedError");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
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
    return next(new UnauthorizedError("Invalid token"));
  }
};

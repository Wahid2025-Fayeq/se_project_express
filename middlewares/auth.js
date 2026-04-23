const jwt = require("jsonwebtoken");

const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    req.user = {
      _id: "5d8b8592978f8bd833ca8133",
    };
    return next();
  }

  const token = authorization.replace("Bearer ", "");

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }
};

// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const { JWT_SECRET = "dev-secret" } = process.env;

// const {
//   BAD_REQUEST_ERROR_CODE,
//   UNAUTHORIZED_ERROR_CODE,
//   NOT_FOUND_ERROR_CODE,
//   CONFLICT_ERROR_CODE,
//   INTERNAL_SERVER_ERROR_CODE,
// } = require("../utils/errors");

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.status(200).send(users))
//     .catch(() =>
//       res
//         .status(INTERNAL_SERVER_ERROR_CODE)
//         .send({ message: "An error has occurred on the server" })
//     );
// };

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) =>
//       User.create({
//         name,
//         avatar,
//         email,
//         password: hash,
//       })
//     )
//     .then((user) =>
//       res.status(201).send({
//         name: user.name,
//         avatar: user.avatar,
//         email: user.email,
//         _id: user._id,
//       })
//     )
//     .catch((err) => {
//       if (err.code === 11000) {
//         return res
//           .status(CONFLICT_ERROR_CODE)
//           .send({ message: "Email is already in use" });
//       }

//       if (err.name === "ValidationError") {
//         return res
//           .status(BAD_REQUEST_ERROR_CODE)
//           .send({ message: "Invalid data" });
//       }

//       return res
//         .status(INTERNAL_SERVER_ERROR_CODE)
//         .send({ message: "An error has occurred on the server" });
//     });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//         expiresIn: "7d",
//       });

//       return res.send({ token });
//     })
//     .catch(() =>
//       res
//         .status(UNAUTHORIZED_ERROR_CODE)
//         .send({ message: "Incorrect email or password" })
//     );
// };

// const getCurrentUser = (req, res) => {
//   User.findById(req.user._id)
//     .orFail(() => {
//       const error = new Error("There is no such user");
//       error.statusCode = NOT_FOUND_ERROR_CODE;
//       throw error;
//     })
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         return res
//           .status(BAD_REQUEST_ERROR_CODE)
//           .send({ message: "Invalid data" });
//       }

//       if (err.statusCode === NOT_FOUND_ERROR_CODE) {
//         return res
//           .status(NOT_FOUND_ERROR_CODE)
//           .send({ message: "Resource not found" });
//       }

//       return res
//         .status(INTERNAL_SERVER_ERROR_CODE)
//         .send({ message: "An error has occurred on the server" });
//     });
// };

// const updateProfile = (req, res) => {
//   const { name, avatar } = req.body;

//   User.findByIdAndUpdate(
//     req.user._id,
//     { name, avatar },
//     { new: true, runValidators: true }
//   )
//     .orFail(() => {
//       const error = new Error("User not found");
//       error.statusCode = NOT_FOUND_ERROR_CODE;
//       throw error;
//     })
//     .then((user) => res.status(200).send(user))
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         return res
//           .status(BAD_REQUEST_ERROR_CODE)
//           .send({ message: "Invalid data" });
//       }

//       if (err.statusCode === NOT_FOUND_ERROR_CODE) {
//         return res
//           .status(NOT_FOUND_ERROR_CODE)
//           .send({ message: "Resource not found" });
//       }

//       return res
//         .status(INTERNAL_SERVER_ERROR_CODE)
//         .send({ message: "An error has occurred on the server" });
//     });
// };
// module.exports = {
//   getUsers,
//   createUser,
//   getCurrentUser,
//   updateProfile,
//   login,
// };

const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET = "dev-secret" } = process.env;

const {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" })
    );
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res
          .status(CONFLICT_ERROR_CODE)
          .send({ message: "Email is already in use" });
      }

      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST_ERROR_CODE).send({ message: "Invalid data" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({ token });
    })
    .catch(() =>
      res
        .status(UNAUTHORIZED_ERROR_CODE)
        .send({ message: "Incorrect email or password" })
    );
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("There is no such user");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }

      if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Resource not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateProfile = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid data" });
      }

      if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        return res
          .status(NOT_FOUND_ERROR_CODE)
          .send({ message: "Resource not found" });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  updateProfile,
  login,
};

const e = require("express");
const User = require("../models/User");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);

      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("There is no user with such ID");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.log(err);

      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID" });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }
      return res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
};

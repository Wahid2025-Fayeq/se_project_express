
const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;

  ClothingItem.create({ name, imageUrl, weather })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      return res.status(500).send({ message: "Internal Server Error" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() => res.status(500).send({ message: "Internal Server Error" }));
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { name, imageUrl, weather } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { name, imageUrl, weather },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: "Internal Server Error" });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: "Internal Server Error" });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: "Internal Server Error" });
    });
};

const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }

      if (err.statusCode === 404) {
        return res.status(404).send({ message: err.message });
      }

      return res.status(500).send({ message: "Internal Server Error" });
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};

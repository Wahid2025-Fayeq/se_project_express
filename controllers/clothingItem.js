const ClothingItem = require("../models/clothingItem");

const createItem = (req, res) => {
  const { name, imageURL, weather } = req.body;

  ClothingItem.create({ name, imageURL, weather })
    .then((item) => {
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }
      res.status(500).send({ message: "Internal Server Error" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { name, imageURL, weather } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { name, imageURL, weather } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
    });
};

module.exports = { createItem, getItems, updateItem, deleteItem };

// const ClothingItem = require("../models/clothingItem");
// const {
//   BAD_REQUEST_ERROR_CODE,
//   NOT_FOUND_ERROR_CODE,
//   INTERNAL_SERVER_ERROR_CODE,
// } = require("../utils/error");

// const createItem = (req, res) => {
//   const { name, imageUrl, weather } = req.body;

//   ClothingItem.create({ name, imageUrl, weather })
//     .then((item) => res.status(201).send(item))
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         return res.status(400).send({ message: err.message });
//       }

//       return res.status(500).send({ message: "Internal Server Error" });
//     });
// };

// const getItems = (req, res) => {
//   ClothingItem.find({})
//     .then((items) => res.status(200).send(items))
//     .catch(() => res.status(500).send({ message: "Internal Server Error" }));
// };

// const updateItem = (req, res) => {
//   const { itemId } = req.params;
//   const { name, imageUrl, weather } = req.body;

//   ClothingItem.findByIdAndUpdate(
//     itemId,
//     { name, imageUrl, weather },
//     { new: true, runValidators: true }
//   )
//     .orFail(() => {
//       const error = new Error("Item not found");
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((item) => res.status(200).send(item))
//     .catch((err) => {
//       if (err.name === "ValidationError") {
//         return res.status(400).send({ message: err.message });
//       }

//       if (err.name === "CastError") {
//         return res.status(400).send({ message: "Invalid item ID" });
//       }

//       if (err.statusCode === 404) {
//         return res.status(404).send({ message: err.message });
//       }

//       return res.status(500).send({ message: "Internal Server Error" });
//     });
// };

// const deleteItem = (req, res) => {
//   const { itemId } = req.params;

//   ClothingItem.findByIdAndDelete(itemId)
//     .orFail(() => {
//       const error = new Error("Item not found");
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((item) => res.status(200).send(item))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         return res.status(400).send({ message: "Invalid item ID" });
//       }

//       if (err.statusCode === 404) {
//         return res.status(404).send({ message: err.message });
//       }

//       return res.status(500).send({ message: "Internal Server Error" });
//     });
// };

// const likeItem = (req, res) => {
//   const { itemId } = req.params;

//   ClothingItem.findByIdAndUpdate(
//     itemId,
//     { $addToSet: { likes: req.user._id } },
//     { new: true }
//   )
//     .orFail(() => {
//       const error = new Error("Item not found");
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((item) => res.status(200).send(item))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         return res.status(400).send({ message: "Invalid item ID" });
//       }

//       if (err.statusCode === 404) {
//         return res.status(404).send({ message: err.message });
//       }

//       return res.status(500).send({ message: "Internal Server Error" });
//     });
// };

// const dislikeItem = (req, res) => {
//   const { itemId } = req.params;

//   ClothingItem.findByIdAndUpdate(
//     itemId,
//     { $pull: { likes: req.user._id } },
//     { new: true }
//   )
//     .orFail(() => {
//       const error = new Error("Item not found");
//       error.statusCode = 404;
//       throw error;
//     })
//     .then((item) => res.status(200).send(item))
//     .catch((err) => {
//       if (err.name === "CastError") {
//         return res.status(400).send({ message: "Invalid item ID" });
//       }

//       if (err.statusCode === 404) {
//         return res.status(404).send({ message: err.message });
//       }

//       return res.status(500).send({ message: "Internal Server Error" });
//     });
// };

// module.exports = {
//   createItem,
//   getItems,
//   updateItem,
//   deleteItem,
//   likeItem,
//   dislikeItem,
// };

const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../utils/error");

const createItem = (req, res) => {
  const { name, imageUrl, weather } = req.body;

  const owner = req.user._id;

  ClothingItem.create({
    name,
    imageUrl,
    weather,
    owner,
  })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Internal Server Error" });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Internal Server Error" })
    );
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }

      if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Internal Server Error" });
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
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }

      if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Internal Server Error" });
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
      error.statusCode = NOT_FOUND_ERROR_CODE;
      throw error;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Invalid item ID" });
      }

      if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }

      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: "Internal Server Error" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};

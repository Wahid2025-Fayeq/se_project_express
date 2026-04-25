const router = require("express").Router();

const clothingItem = require("./clothingItems");
const usersRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", usersRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: "Resource not found" });
});
module.exports = router;

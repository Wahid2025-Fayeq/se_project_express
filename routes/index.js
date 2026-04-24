const router = require("express").Router();

const clothingItem = require("./clothingItems");
const usersRouter = require("./users");

router.use("/items", clothingItem);
router.use("/users", usersRouter);

module.exports = router;

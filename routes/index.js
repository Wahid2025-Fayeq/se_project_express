const router = require("express").Router();

const clothingItem = require("./clothingItems");
const usersRouter = require("./users");

const auth = require("../middlewares/auth");

const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const {
  validateCreateUser,
  validateLogin,
} = require("../middlewares/validation");

const NotFoundError = require("../errors/NotFoundError");

router.post("/signin", validateLogin, login);
router.post("/signup", validateCreateUser, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/items", clothingItem);
router.use("/users", usersRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Resource not found"));
});
module.exports = router;

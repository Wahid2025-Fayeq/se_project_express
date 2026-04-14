const router = require("express").Router();
const { getUsers, createUser, getUserById } = require("../controllers/user");

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:userId", getUserById);


module.exports = router;

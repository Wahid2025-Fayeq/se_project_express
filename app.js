const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const auth = require("./middlewares/auth");
const mainRouter = require("./routes");

const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");
const { NOT_FOUND_ERROR_CODE } = require("./utils/errors");

const app = express();
const { PORT = 3001 } = process.env;

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use((req, res, next) => {
  const protectedRoutes = ["/users", "/items"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    req.path.startsWith(route)
  );

  if (!isProtectedRoute) {
    return res
      .status(NOT_FOUND_ERROR_CODE)
      .send({ message: " Resource not found" });
  }

  return next();
});

app.use(auth);
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

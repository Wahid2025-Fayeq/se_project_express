const express = require("express");
const mongoose = require("mongoose");

const auth = require("./middlewares/auth");
const mainRouter = require("./routes");
const cors = require("cors");

const { login, createUser } = require("./controllers/users");
const { getItems } = require("./controllers/clothingItems");

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.post("/signin", login);
app.post("/signup", createUser);
app.get("/items", getItems);

app.use(auth);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

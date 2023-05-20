const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { mongoConnect } = require("../config/database");
const adRouter = require("../Routes/ad.route");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send({ msg: "Welcome to olx store " });
});

app.use("/product", adRouter);

app.listen(PORT, async () => {
  try {
    await mongoConnect;
    console.log("Database connect successfully");
  } catch (error) {
    console.log(error);
  }
  console.log(`Listing on port ${PORT}`);
});

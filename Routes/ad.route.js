const express = require("express");
const adRouter = express.Router();
const {
  postProduct,
  getAllProduct,
  deletePostProduct,
} = require("../Controllers/adController");

adRouter.route("/ads").post(postProduct);
adRouter.route("/ads").get(getAllProduct);
adRouter.route("/:id").delete(deletePostProduct);

module.exports = adRouter;

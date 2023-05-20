const mongoose = require("mongoose");

const mongoConnect = mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = { mongoConnect };

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/authenticate")

  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

const Collections = mongoose.model("auths", Schema);

module.exports = Collections;


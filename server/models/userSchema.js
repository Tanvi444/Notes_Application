const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

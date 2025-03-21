const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: { type: String, require: true },
  description: { type: String, require: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, default: false },
  updatedOn: { type: Date, default: new Date().getTime() },
});

const notesModel = mongoose.model("notes", notesSchema);
module.exports = notesModel;

const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
  console.info("[INFO]: Database connected");
};

module.exports = connectDatabase;

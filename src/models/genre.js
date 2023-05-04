const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Genre", genreSchema);

const mongoose = require("mongoose");

const videogameSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    released: {
      type: String,
    },
    rating: {
      type: Number,
    },
    platforms: {
      type: Array,
      required: true,
    },
    genres: {
      type: Array,
    },
    background_image: {
      type: String,
    },
    createdInDb: {
      type: Boolean,
      default: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Videogame", videogameSchema);

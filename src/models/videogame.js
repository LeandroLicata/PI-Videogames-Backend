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
      type: [
        {
          id: {
            type: Number,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    genres: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          slug: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
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

const mongoose = require("mongoose");

const platformSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Platform", platformSchema);
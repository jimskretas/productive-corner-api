const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  settings: Object,
});

module.exports = mongoose.model("Settings", settingsSchema);

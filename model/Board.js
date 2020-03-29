const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  board: Object
});

module.exports = mongoose.model("Board", boardSchema);

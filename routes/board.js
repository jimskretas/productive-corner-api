const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Board = require("../model/Board");

//Get board
router.get("/", verify, (req, res) => {
  // res.send(req.user);
  Board.find({ user_id: req.user._id }, (err, board) => {
    if (err) {
      console.log(err);
    } else {
      res.send(board);
    }
  });
});

//Update Board
router.put("/update", verify, (req, res) => {
  const query = { user_id: req.user._id };
  console.log(req.body);
  const newData = {
    user_id: req.user._id,
    board: req.body
  };

  Board.findOneAndUpdate(query, newData, function(err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send("Succesfully saved.");
  });
});

module.exports = router;

const router = require("express").Router();
const verify = require("./verifyToken");
const User = require("../model/User");
const Settings = require("../model/Settings");

//Get settings
router.get("/", verify, (req, res) => {
  // res.send(req.user);
  Settings.find({ user_id: req.user._id }, (err, settings) => {
    if (err) {
      console.log(err);
    } else {
      res.send(settings);
    }
  });
});

//Update Settings
router.put("/update", verify, (req, res) => {
  const query = { user_id: req.user._id };
  console.log(req.body);
  const newData = {
    user_id: req.user._id,
    settings: req.body,
  };

  Settings.findOneAndUpdate(query, newData, function (err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send("Succesfully saved.");
  });
});

module.exports = router;

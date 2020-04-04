const router = require("express").Router();
const User = require("../model/User");
const Board = require("../model/Board");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

//REGISTER
router.post("/register", async (req, res) => {
  //User input validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the user already exists
  const usernameExists = await User.findOne({ username: req.body.username });
  if (usernameExists) return res.status(400).send("Username already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    username: req.body.username,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();

    //Create a new empty board for the new user
    const board = new Board({
      user_id: user._id,
      board: {
        cards: {
          card0: { id: "card0", content: "" }
        },
        columns: {
          backlog: {
            id: "backlog",
            title: "Backlog",
            cardIds: []
          },
          todo: {
            id: "todo",
            title: "To do",
            cardIds: []
          },
          doing: {
            id: "doing",
            title: "Doing",
            cardIds: []
          },
          done: {
            id: "done",
            title: "Done",
            cardIds: []
          }
        },
        columnOrder: ["backlog", "todo", "doing", "done"],
        cardNumber: 0
      }
    });
    const savedBoard = await board.save();
    res.send(board);
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //User input validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if the username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Username doesn't exists");

  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKKEN_SECRET, {
    expiresIn: "3d"
  });
  res.header("auth-token", token).send(token);
});

module.exports = router;

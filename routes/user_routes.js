const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = function (app, db) {
  // create user
  app.post("/users", async (req, res) => {
    try {
      let user = new User(req.body);
      const result = await user.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(400).send("Unable to create user");
    }
  });
  // authenticate user
  app.post("/authenticate", async (req, res) => {
    try {
      const result = await User.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (!result) {
        res.status(404).json({ message: "Sorry, user could not be found" });
      } else {
        let token = jwt.sign(
          { email: result.email },
          global.config.jwt_secret,
          { expiresIn: "24h" }
        );
        // store the JWT token as a cookie only accessible server side
        res.cookie("token", token, { httpOnly: true });
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(500).send("Unable to authenticate user");
    }
  });
};

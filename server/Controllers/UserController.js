const User = require("../Models/User");
const { hashPassword, checkPassword } = require("../helper/bcrypt");
const signToken = require("../helper/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      let { username, email, password } = req.body;
      const newPass = hashPassword(password);
      const newUser = new User({
        username,
        email,
        password: newPass,
        posts: [],
      });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      const user = await User.findOne({ email }).populate("posts");

      if (!user) {
        throw { message: "Invalid email or password" };
      } else {
        const comparePassword = checkPassword(password, user.password);

        if (!comparePassword) {
          throw { message: "Invalid email or password" };
        } else {
          let payload = {
            _id: user._id,
            username: user.username,
          };

          const token = signToken(payload);

          res.status(200).json({ access_token: token, user });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = UserController;

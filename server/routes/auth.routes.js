const Router = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

const router = new Router();

const authMiddleware = require("../middlewares/auth.middleware");

const fileService = require("../services/fileService");
const File = require("../models/File");

//Registration
router.post(
  "/signup",
  [
    check("email", "Email is incorrect").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12 symbols"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: "error",
          code: 400,
          message: `Bad request`,
          errors,
        });
      }

      const { email, password } = req.body;
      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: `User with email ${email} already exist`,
        });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashPassword });
      await user.save();

      await fileService.createDir(req, new File({ user: user.id, name: "" }));

      return res.json({
        status: "success",
        code: 200,
        message: `User ${email} was created`,
      });
    } catch (error) {
      return res.send({ message: "Server error", error });
    }
  }
);

//Login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `User ${email} not found`,
      });
    }

    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
});

//Auth
router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.id });

    const token = jwt.sign({ id: user.id }, config.get("secretKey"), {
      expiresIn: "1h",
    });

    return res.status(200).json({
      status: "success",
      code: 200,
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;

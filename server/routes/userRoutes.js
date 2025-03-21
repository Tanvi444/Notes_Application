const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");

const User = require("../models/userSchema");
const { authenticateToken } = require("../utils/authentication");

const router = express.Router();

router.post(
  "/register",
  [
    body("name", "Please enter a valid name").isLength({ min: 3, max: 50 }),
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 6 and at most 16 characters long").isLength({ min: 6, max: 16 }),
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        success: false,
        message: "Bad request: Request payload is not valid.",
        errors: errors.array(),
      });
    }

    try {
      const isUserExists = await User.findOne({ email: request.body.email });
      if (isUserExists) {
        return response.status(409).json({
          success: false,
          message: "Duplicate request: A user with same email already exists",
          errors: null,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(request.body.password, salt);

      const user = await User.create({
        name: request.body.name,
        email: request.body.email,
        password: encryptedPassword,
      });

      const accessToken = jsonWebToken.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      return response.status(201).json({
        success: true,
        message: "User registration successful",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      console.error("[ERROR]: Error creating user: ", error);
      response.status(500).json({
        success: false,
        message: "Internal server error",
        errors: null,
      });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password must be at least 6 and at most 16 characters long").isLength({ min: 6 }),
  ],
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        success: false,
        message: "Bad request: Request payload is not valid.",
        errors: errors.array(),
      });
    }

    const { email, password } = request.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return response.status(404).json({
          success: false,
          message: "Not found: User with this email doesn't exists. Please register first.",
          errors: null,
        });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return response.status(400).json({
          success: false,
          message: "Invalid credentials: Given email or password is incorrect. Please login using valid credentials",
          errors: null,
        });
      }

      const accessToken = jsonWebToken.sign({ id: user.id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      return response.status(200).json({
        success: true,
        message: "User login successful",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      console.error("[ERROR]: Error in user login: ", error);
      response.status(500).json({
        success: false,
        message: "Internal server error",
        errors: null,
      });
    }
  }
);

router.get("/me", authenticateToken, async (request, response) => {
  const userId = request.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({
        success: false,
        message: "Not found: User not found.",
        errors: null,
      });
    }

    const userDetails = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdOn,
    };

    return response.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      data: {
        user: userDetails,
      },
    });
  } catch (error) {
    console.error("[ERROR]: Error in getting user profile: ", error);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      errors: null,
    });
  }
});

module.exports = router;

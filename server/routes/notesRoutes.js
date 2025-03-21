const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/userSchema");
const Notes = require("../models/notesSchema");
const { authenticateToken } = require("../utils/authentication");

const router = express.Router();

router.post(
  "/add",
  authenticateToken,
  [
    body("title", "Please enter a valid title").isLength({ min: 3, max: 50 }),
    body("description", "Description must be at least 5 characters").isLength({ min: 5 }),
  ],
  async (request, response) => {
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

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({
          success: false,
          message: "Bad request: Request payload is not valid.",
          errors: errors.array(),
        });
      }

      const { title, description, tags } = request.body;
      const isNoteExists = await Notes.findOne({ title });

      if (isNoteExists) {
        return response.status(409).json({
          success: false,
          message: "Duplicate request: A note with same title already exists",
          errors: null,
        });
      }

      const note = await Notes.create({
        user: userId,
        title,
        description,
        tags: Array.isArray(tags) ? tags : [],
      });

      return response.status(201).json({
        success: true,
        message: "Note added successful",
        data: { note },
      });
    } catch (error) {
      console.error("[ERROR]: Error adding note: ", error);
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

    const notes = await Notes.find({ user: userId });

    return response.status(200).json({
      success: true,
      message: "All notes fetched successfully.",
      data: {
        notes,
      },
    });
  } catch (error) {
    console.error("[ERROR]: Error in getting notes: ", error);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      errors: null,
    });
  }
});

module.exports = router;

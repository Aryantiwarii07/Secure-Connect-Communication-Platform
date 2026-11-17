
const express = require("express");

const router = express.Router();

const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

// All notes routes require authentication
router.use(protect);

// CREATE NOTE
router.post("/", createNote);

// GET ALL NOTES
router.get("/", getNotes);

// UPDATE NOTE
router.put("/:id", updateNote);

// DELETE NOTE
router.delete("/:id", deleteNote);

module.exports = router;

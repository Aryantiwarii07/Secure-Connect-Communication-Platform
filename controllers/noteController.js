
const Note = require("../models/Note");

// 1. CREATE NOTE
exports.createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const note = await Note.create({
            title,
            content,
            owner: req.user.id
        });

        res.status(201).json({
            message: "Note created successfully",
            note
        });

    } catch (error) {
        next(error);
    }
};


// 2. GET ALL PERSONAL NOTES
exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find({
            owner: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(notes);

    } catch (error) {
        next(error);
    }
};


// 3. UPDATE PERSONAL NOTE
exports.updateNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const note = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                owner: req.user.id
            },
            {
                title,
                content
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note
        });

    } catch (error) {
        next(error);
    }
};


// 4. DELETE PERSONAL NOTE
exports.deleteNote = async (req, res, next) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

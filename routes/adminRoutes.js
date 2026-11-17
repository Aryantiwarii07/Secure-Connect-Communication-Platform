
const express = require("express");
const router = express.Router();

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/dashboard",
    protect,
    authorize("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Welcome to Admin Dashboard",
            user: req.user
        });
    }
);

module.exports = router;

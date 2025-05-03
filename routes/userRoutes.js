const express = require("express");
const router = express.Router();
const authController = require('../controller/authController');
const User = require("../models/userModel"); // Make sure this path is correct
const authorizeRoles=require("../middlewares/roleMiddleware");
const verifyToken = require('../middlewares/authMiddleware');

// All users can access this
router.get("/user", verifyToken, authorizeRoles("admin","manager","user"),(req, res) => {
    res.send("User access granted");
});

// Admin and manager access
router.get("/manager", verifyToken, authorizeRoles("admin","manager"),(req, res) => {
    if (req.user.role === "admin" || req.user.role === "manager") {
        return res.send("Manager access granted");
    }
    return res.status(403).json({ message: "Access denied. Managers only." });
});

// Only admin access
router.get("/admin", verifyToken,authorizeRoles("admin"), (req, res) => {
    if (req.user.role === "admin") {
        return res.send("Admin access granted");
    }
    return res.status(403).json({ message: "Access denied. Admins only." });
});

module.exports = router;

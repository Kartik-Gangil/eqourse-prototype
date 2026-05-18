const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require("../controller/authController");

// POST /api/auth/register
router.post("/register", registerAdmin);

// POST /api/auth/login
router.post("/login", loginAdmin);

module.exports = router;

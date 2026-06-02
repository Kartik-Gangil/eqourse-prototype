const Admin = require("../model/admin");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "eqourse_secret_key", {
    expiresIn: "30d",
  });
};

/**
 * POST /api/auth/register
 * Register a new admin
 */
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (adminExists) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
    });

    if (admin) {
      res.status(201).json({
        success: true,
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid admin data" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * POST /api/auth/login
 * Admin login
 */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.comparePassword(password))) {
      res.json({
        success: true,
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { registerAdmin, loginAdmin };

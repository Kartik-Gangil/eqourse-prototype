const mongoose = require("mongoose");
const Admin = require("../src/model/admin");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/eqourse";

const registerInitialAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const username = "admin";
    const email = "admin@eqourse.com";
    const password = "admin123"; // You should change this in production!

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    const admin = new Admin({
      username,
      email,
      password,
    });

    await admin.save();
    console.log(`Admin created successfully!`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

registerInitialAdmin();

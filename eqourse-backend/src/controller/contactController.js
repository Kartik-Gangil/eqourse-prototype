const ContactQuery = require("../model/sample");

/**
 * POST /api/contact
 * Save a new contact form submission
 */
const submitContactQuery = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone_code,
      phone,
      company,
      designation,
      interest,
      preferred_date,
      preferred_time,
      message,
      source,
    } = req.body;

    // Basic validation for required fields
    if (!full_name || !email || !phone || !company || !designation || !interest) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: full_name, email, phone, company, designation, interest",
      });
    }

    const query = new ContactQuery({
      full_name,
      email,
      phone_code: phone_code || "+91",
      phone,
      company,
      designation,
      interest,
      preferred_date: preferred_date || null,
      preferred_time: preferred_time || null,
      message: message || "",
      source: source || "",
    });

    await query.save();

    return res.status(201).json({
      success: true,
      message: "Contact query submitted successfully.",
      data: query,
    });
  } catch (error) {
    console.error("Error saving contact query:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

/**
 * GET /api/contact
 * Fetch all contact queries (for admin use)
 */
const getAllContactQueries = async (req, res) => {
  try {
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: queries });
  } catch (error) {
    console.error("Error fetching contact queries:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/contact/:id
 * Update contact query (admin)
 */
const updateContactQuery = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;
    const query = await ContactQuery.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }

    if (status) query.status = status;
    if (internalNotes !== undefined) query.internal_notes = internalNotes;

    await query.save();
    return res.status(200).json({ success: true, data: query });
  } catch (error) {
    console.error("Error updating contact query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/contact/:id
 * Delete contact query (admin)
 */
const deleteContactQuery = async (req, res) => {
  try {
    const query = await ContactQuery.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    return res.status(200).json({ success: true, message: "Query deleted" });
  } catch (error) {
    console.error("Error deleting contact query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitContactQuery, getAllContactQueries, updateContactQuery, deleteContactQuery };

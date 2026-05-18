const PilotQuery = require("../model/pilot");

/**
 * POST /api/pilot
 * Save a new pilot request submission
 */
const submitPilotQuery = async (req, res) => {
  try {
    const {
      full_name,
      email,
      company,
      designation,
      pilot_type,
      service_detail,
      languages,
      message,
    } = req.body;

    // Basic validation
    if (!full_name || !email || !company || !designation || !pilot_type || !service_detail || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const query = new PilotQuery({
      full_name,
      email,
      company,
      designation,
      pilot_type,
      service_detail,
      languages: languages || "",
      message,
    });

    await query.save();

    return res.status(201).json({
      success: true,
      message: "Pilot query submitted successfully.",
      data: query,
    });
  } catch (error) {
    console.error("Error saving pilot query:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

/**
 * GET /api/pilot
 * Fetch all pilot queries (for admin use)
 */
const getAllPilotQueries = async (req, res) => {
  try {
    const queries = await PilotQuery.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: queries });
  } catch (error) {
    console.error("Error fetching pilot queries:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

/**
 * PATCH /api/pilot/:id
 * Update pilot query (admin)
 */
const updatePilotQuery = async (req, res) => {
  try {
    const { status, internalNotes } = req.body;
    const query = await PilotQuery.findById(req.params.id);

    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }

    if (status) query.status = status;
    if (internalNotes !== undefined) query.internal_notes = internalNotes;

    await query.save();
    return res.status(200).json({ success: true, data: query });
  } catch (error) {
    console.error("Error updating pilot query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * DELETE /api/pilot/:id
 * Delete pilot query (admin)
 */
const deletePilotQuery = async (req, res) => {
  try {
    const query = await PilotQuery.findByIdAndDelete(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: "Query not found" });
    }
    return res.status(200).json({ success: true, message: "Query deleted" });
  } catch (error) {
    console.error("Error deleting pilot query:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { submitPilotQuery, getAllPilotQueries, updatePilotQuery, deletePilotQuery };

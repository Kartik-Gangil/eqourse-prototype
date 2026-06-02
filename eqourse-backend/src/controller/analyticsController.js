const ContactQuery = require("../model/contact_us_queries");
const Pilot = require("../model/pilot");
const Blog = require("../model/blog");
const CaseStudy = require("../model/caseStudy");
const SampleItem = require("../model/sampleItem");

/**
 * GET /api/admin/analytics/summary
 * Admin — returns dashboard analytics matching AnalyticsSummary interface
 */
const getAnalyticsSummary = async (req, res) => {
  try {
    // ── Totals ────────────────────────────────────────────
    const [contactCount, pilotCount, blogCount, caseStudyCount, sampleCount] =
      await Promise.all([
        ContactQuery.countDocuments(),
        Pilot.countDocuments(),
        Blog.countDocuments(),
        CaseStudy.countDocuments(),
        SampleItem.countDocuments(),
      ]);

    // ── Deltas (current 30 days vs previous 30 days) ─────
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    const [contactCurrent, contactPrevious, pilotCurrent, pilotPrevious] =
      await Promise.all([
        ContactQuery.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        ContactQuery.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
        Pilot.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        Pilot.countDocuments({ createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo } }),
      ]);

    const calcDelta = (current, previous) => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return ((current - previous) / previous) * 100;
    };

    // ── Queries Over Time (last 30 days) ─────────────────
    const queriesOverTime = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      const dayStart = new Date(dateStr + "T00:00:00Z");
      const dayEnd = new Date(dateStr + "T23:59:59Z");

      const [contactDay, pilotDay] = await Promise.all([
        ContactQuery.countDocuments({ createdAt: { $gte: dayStart, $lte: dayEnd } }),
        Pilot.countDocuments({ createdAt: { $gte: dayStart, $lte: dayEnd } }),
      ]);

      queriesOverTime.push({ date: dateStr, contact: contactDay, pilot: pilotDay });
    }

    // ── Service Interest Breakdown ───────────────────────
    const interestAgg = await Pilot.aggregate([
      { $group: { _id: "$serviceInterest", count: { $sum: 1 } } },
    ]);
    const serviceInterestBreakdown = interestAgg.map((item) => ({
      label: item._id || "other",
      count: item.count,
    }));

    // ── Status Funnel ────────────────────────────────────
    const statusAgg = await Promise.all([
      ContactQuery.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Pilot.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);

    const statusMap = new Map();
    [...statusAgg[0], ...statusAgg[1]].forEach((item) => {
      const current = statusMap.get(item._id) || 0;
      statusMap.set(item._id, current + item.count);
    });

    const statusFunnel = ["new", "in_progress", "contacted", "closed"].map((status) => ({
      status,
      count: statusMap.get(status) || 0,
    }));

    // ── Response ─────────────────────────────────────────
    return res.json({
      success: true,
      data: {
        totals: {
          contactQueries: contactCount,
          pilotQueries: pilotCount,
          blogs: blogCount,
          caseStudies: caseStudyCount,
          samples: sampleCount,
        },
        deltas: {
          contactQueries: parseFloat(calcDelta(contactCurrent, contactPrevious).toFixed(1)),
          pilotQueries: parseFloat(calcDelta(pilotCurrent, pilotPrevious).toFixed(1)),
        },
        queriesOverTime,
        serviceInterestBreakdown,
        statusFunnel,
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getAnalyticsSummary };

const Customer = require("../models/Customer");
const Case = require("../models/Case");
const User = require("../models/User");

const getDashboardStats = async (req, res, next) => {
  try {
    const [totalCustomers, totalCases, totalUsers, casesByStatus, casesByPriority, customersByStatus] =
      await Promise.all([
        Customer.countDocuments(),
        Case.countDocuments(),
        User.countDocuments(),
        Case.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
        Case.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]),
        Customer.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      ]);

    const recentCases = await Case.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("customer_id", "name company")
      .populate("assigned_to", "username");

    res.status(200).json({
      success: true,
      stats: {
        totalCustomers,
        totalCases,
        totalUsers,
        casesByStatus,
        casesByPriority,
        customersByStatus,
        recentCases,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardStats };

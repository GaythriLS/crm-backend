const Case = require("../models/Case");

const getAllCases = async (req, res, next) => {
  try {
    const { status, priority, customer_id, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (customer_id) query.customer_id = customer_id;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Case.countDocuments(query);
    const cases = await Case.find(query)
      .populate("customer_id", "name contact_info company")
      .populate("assigned_to", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: cases.length,
      total,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      cases,
    });
  } catch (error) {
    next(error);
  }
};

const getCaseById = async (req, res, next) => {
  try {
    const caseItem = await Case.findById(req.params.id)
      .populate("customer_id", "name contact_info company status")
      .populate("assigned_to", "username email role");

    if (!caseItem) {
      return res.status(404).json({ success: false, message: "Case not found." });
    }

    res.status(200).json({ success: true, case: caseItem });
  } catch (error) {
    next(error);
  }
};

const createCase = async (req, res, next) => {
  try {
    const caseItem = await Case.create(req.body);
    const populated = await caseItem.populate([
      { path: "customer_id", select: "name contact_info company" },
      { path: "assigned_to", select: "username email" },
    ]);

    res.status(201).json({ success: true, message: "Case created successfully.", case: populated });
  } catch (error) {
    next(error);
  }
};

const updateCase = async (req, res, next) => {
  try {
    const caseItem = await Case.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("customer_id", "name contact_info company")
      .populate("assigned_to", "username email");

    if (!caseItem) {
      return res.status(404).json({ success: false, message: "Case not found." });
    }

    res.status(200).json({ success: true, message: "Case updated successfully.", case: caseItem });
  } catch (error) {
    next(error);
  }
};

const deleteCase = async (req, res, next) => {
  try {
    const caseItem = await Case.findByIdAndDelete(req.params.id);

    if (!caseItem) {
      return res.status(404).json({ success: false, message: "Case not found." });
    }

    res.status(200).json({ success: true, message: "Case deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllCases, getCaseById, createCase, updateCase, deleteCase };

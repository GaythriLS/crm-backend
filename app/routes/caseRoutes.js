const express = require("express");
const router = express.Router();
const { getAllCases, getCaseById, createCase, updateCase, deleteCase } = require("../controllers/caseController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getAllCases).post(createCase);

router
  .route("/:id")
  .get(getCaseById)
  .put(updateCase)
  .patch(updateCase)
  .delete(authorize("admin", "manager"), deleteCase);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

router.use(protect);

router.route("/").get(authorize("admin", "manager"), getAllUsers);
router
  .route("/:id")
  .get(getUserById)
  .put(authorize("admin"), updateUser)
  .delete(authorize("admin"), deleteUser);

module.exports = router;

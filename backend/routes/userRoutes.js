const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  updateUserRole,
  updateUserStatus
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.put('/:id/role', updateUserRole);
router.put('/:id/status', updateUserStatus); // ✅ REQUIRED

module.exports = router;

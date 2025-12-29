const express = require('express');
const router = express.Router();
const {getAllSessions,createSession,deleteSession } = require('../controllers/sessionController');
const {authenticateToken, allowRoles }=require("../middleware/auth");


router.post('/',authenticateToken,createSession);
router.get("/",authenticateToken,allowRoles("admin"),getAllSessions);
router.delete("/:id",authenticateToken,allowRoles("admin"),deleteSession);
module.exports = router;
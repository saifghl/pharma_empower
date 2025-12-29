const express = require('express');
const router = express.Router();
const { getPharmaNews } = require('../controllers/pharmaNewsController');
const { authenticateToken } = require('../middleware/auth');

router.get('/',authenticateToken,getPharmaNews);

module.exports = router;
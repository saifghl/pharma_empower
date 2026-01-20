const express = require('express');
const { getPageContent, updatePageContent, getAllPages } = require('../controllers/pageController');
const router = express.Router();

router.get('/', getAllPages);
router.get('/:slug', getPageContent);
router.put('/:slug', updatePageContent);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
    createQuestion,
    getPublicQA
} = require('../controllers/communityController');

// User submits question
router.post('/ask', createQuestion);

// Public Q&A
router.get('/public', getPublicQA);

module.exports = router;

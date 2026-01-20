const express = require('express');
const router = express.Router();

const {
    getPendingQuestions,
    answerQuestion
} = require('../controllers/communityAdminController');

router.get('/pending', getPendingQuestions);
router.put('/answer/:id', answerQuestion);

module.exports = router;

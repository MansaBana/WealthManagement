const express = require('express');
const { getEmailsAndExtractData } = require('../controllers/emailController');

const router = express.Router();

router.post('/', getEmailsAndExtractData);

module.exports = router;
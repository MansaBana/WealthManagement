const express = require('express');
const { getEmailsAndExtractData } = require('../controllers/emailController');

const router = express.Router();

router.get('/', getEmailsAndExtractData);

module.exports = router;
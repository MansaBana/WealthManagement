const express = require('express');
const { getUsers, getUer } = require('../controllers/userController');

const router = express.Router();

router.get('/users', getUsers);

router.get('/user', getUer);

module.exports = router;
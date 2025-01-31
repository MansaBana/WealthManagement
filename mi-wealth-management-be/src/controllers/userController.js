const userData = require('../models/FinancialProfile');


const getUsers = (req, res) => {
  res.json({ message: 'Get all users' });
};

const getUer = async (req, res, next) => {
  try {
    // Fetch all documents from the userData collection
    const userDat = await userData.find();
    res.json(userDat);
  } catch (err) {
    next(err);
  }
};

module.exports = {getUsers, getUer}
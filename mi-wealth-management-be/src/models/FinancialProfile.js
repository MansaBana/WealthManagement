const mongoose = require('mongoose');

// Define individual schemas
const personSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, enum: ['M', 'F', 'Other'], required: true },
  occupation: { type: String, required: true },
  location: { type: String, required: true },
  relationship_status: { type: String, required: true },
  children: { type: String, required: true },
  income: { type: String, required: true },
  expenses: { type: String, required: true },
});

const bankStatementSchema = new mongoose.Schema({
  type: { type: String, enum: ['Debit', 'Credit'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  from: { type: String, required: true },
});

const stockTransactionSchema = new mongoose.Schema({
  stock_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchase_price: { type: Number, required: true },
  date_of_purchase: { type: Date, required: true },
  current_value: { type: Number, required: true },
});

const realEstatePropertySchema = new mongoose.Schema({
  property_name: { type: String, required: true },
  purchase_price: { type: String, required: true },
  location: { type: String, required: true },
  date_of_purchase: { type: Date, required: true },
  sq_ft_area: { type: String, required: true },
});

const otherAssetSchema = new mongoose.Schema({
  asset_type: { type: String, required: true },
  purchase_price: { type: String, required: true },
  date_of_purchase: { type: Date, required: true },
});

// Combine all schemas into the main schema
const userData = new mongoose.Schema({
  person: personSchema,
  bank_statement: [bankStatementSchema],
  stock_transactions: [stockTransactionSchema],
  real_estate_properties: [realEstatePropertySchema],
  other_assets: [otherAssetSchema],
},
{ collection: 'userData' }
);

module.exports = mongoose.model('userData', userData);
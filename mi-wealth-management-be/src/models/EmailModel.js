const mongoose = require("mongoose");

const emailItemSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    body: { type: String, required: true },
    receivedAt: { type: Date, default: Date.now }
});

const userEmailsSchema = new mongoose.Schema({
    emailAddress: { type: String, required: true, unique: true },
    emails: [emailItemSchema]
},
{ collection: 'userEmail' });
  

const UserEmails = mongoose.model("UserEmails", userEmailsSchema);
  
module.exports = UserEmails;
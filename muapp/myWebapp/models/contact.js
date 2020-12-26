const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: {type: String, required: true },
  surname: {type: String, required: true},
  street: {type: String, required: true},
  plz: {type: String, required: true},
  city: {type: String, required: true},
  country: {type: String, required: true},
  creator: {type: String, required: true},
  privacy: {type: Boolean, required: true}
});

module.exports = mongoose.model('Contact', contactSchema);

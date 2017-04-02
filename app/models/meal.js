// app/models/meal.js

// load mongoose
var mongoose = require('mongoose');

module.exports = mongoose.model('Meal', {
  ingredients: [],
  name: String,
  created_at: Date
});

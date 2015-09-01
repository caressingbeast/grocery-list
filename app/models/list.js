// app/models/list.js

// load mongoose
var mongoose = require('mongoose');

module.exports = mongoose.model('List', {
  done: Boolean,
  items: [{
    text: String,
    done: Boolean
  }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now },
});

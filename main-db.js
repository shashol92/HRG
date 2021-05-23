var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/master', { useUnifiedTopology: true });

module.exports = mongoose;
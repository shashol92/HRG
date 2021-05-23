var mongoose = require('../main-db');

var usersSchema = new mongoose.Schema({
    userId: { type: Number, required: true, unique: true },
    name: String,
    username: String,
    email: String,
    address: {
        city: String,
        street: String,
        zipcode: String,
        suite: String,
        geo: {
            lat: String,
            lng: String
        }
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String,
    },
});

var Users = mongoose.model("users", usersSchema);

module.exports = Users;
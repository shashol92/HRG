const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    commentId: Number,
    body: String,
    name: String,
    email: String
}, { _id: false })

const postSchema = mongoose.Schema({
    postId: Number,
    comments: [commentsSchema]
}, { _id: false });


const Posts = mongoose.Schema({
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
    posts: [postSchema]
})

module.exports = Posts;
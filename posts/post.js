const express = require('express');
const router = express.Router();
const request = require("request");
const User = require("../users/users-model");
var mongoose = require('mongoose');
const postSchema = require("../posts/post-model");

router.get('/getAllPosts', (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    request(url, (error, response, body) => {
        if (error) {
            res.send(error)
        }
        res.send(JSON.parse(response.body))
    })
});

router.get('/insertPosts', async (req, res) => {
    User.find({}, async (error, response) => {
        if (error) {
            res.send(error)
        } else {
            const users = response;
            const postUrl = "https://jsonplaceholder.typicode.com/posts";
            const commentUrl = "https://jsonplaceholder.typicode.com/comments";
            await request(postUrl, async (error, response, body) => {
                if (error) {
                    res.send(error)
                }
                const posts = JSON.parse(response.body);
                const usersWithPosts = users.map(item => ({
                    userId: item.userId,
                    name: item.name,
                    username: item.username,
                    email: item.email,
                    address: item.address,
                    phone: item.phone,
                    website: item.website,
                    company: item.company,
                    posts: getPosts(item.userId, posts)
                }));
                await request(commentUrl, async (error, resp) => {
                    if (error) {
                        res.send(error)
                    }
                    const comments = JSON.parse(resp.body);
                    const fullUser = usersWithPosts.map(element => ({
                        userId: element.userId,
                        name: element.name,
                        username: element.username,
                        email: element.email,
                        address: element.address,
                        phone: element.phone,
                        website: element.website,
                        company: element.company,
                        posts: element.posts.map(value => ({
                            postId: value.postId,
                            comments: getComments(value.postId, comments)
                        }))

                    }));

                    try {
                        let results = await createDataBaseAndInsert(fullUser);
                        res.send(results);
                    } catch (error) {
                        if(error.code == 11000){
                            res.send({
                                error: error.name,
                                message: "E11000 duplicate key error collection: master.users index: userId_1 dup key: { userId: 1 }"
                            });
                        }
                    }
                })
            })
        }
    })
});

function createDataBaseAndInsert(user) {
    return new Promise((resolve, reject) => {
        user.forEach(element => {
            let db = mongoose.createConnection('mongodb://localhost/db_' + element.userId);
            const Posts = db.model('posts', postSchema);
            Posts.create(element, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve({
                    status: 200,
                    message: "Insertion success"
                })
            })
        });
    })
}

function getComments(postId, comments) {
    var filter = comments.filter(item => {
        return item.postId == postId
    }).map(value => ({
        commentId: value.id,
        body: value.body,
        name: value.name,
        email: value.email
    }))
    return filter;
}

function getPosts(userId, posts) {
    var filterArr = posts.filter(item => {
        return item.userId == userId;
    }).map(value => ({
        postId: value.id,
        title: value.title,
        body: value.body
    }))
    return filterArr;
}

module.exports = router;
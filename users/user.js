const express = require('express');
const app = express();
const router = express.Router();
const request = require('request');
const Users = require("../users/users-model");
const PostSchema = require('../posts/post-model');
const mongoose = require('mongoose');
const cors = require('cors');
router.use(cors());
router.get('/insertUsers', (req, res) => {
    const url = "https://jsonplaceholder.typicode.com/users";
    request(url, (error, response, body) => {
        if (error) {
            res.send(error)
        } else {
            const resp = JSON.parse(response.body);
            const users = resp.map(({
                id: userId,
                ...rest
            }) => ({
                userId,
                ...rest
            }));
            console.log(users);
            Users.insertMany(users).then(result => {
                res.send(result);
            }).catch(error => {
                res.send(error);
            })
        }

    })
});

router.get('/getAllUsers', (req, res) => {
    Users.find({}, (error, response) => {
        if (response) {
            res.send({
                totalUsers: response.length,
                users: response,
                status: 200
            })
        } else {
            res.send(error)
        }
    })
});

router.get('/userDetails/:id', (req, res) => {
    let userId = req.params.id;
    let db = mongoose.connection.useDb("db_" + userId);
    const Posts = db.model('posts', PostSchema);
    Posts.find({}, (err, resp) => {
        if (err) {
            res.send(err);
        }
        res.send(resp);
    })
})

router.get('/userPosts/:id', (req, res) => {
    let userId = req.params.id;
    let db = mongoose.connection.useDb("db_" + userId);
    const Posts = db.model('posts', PostSchema);
    Posts.find({}, (err, resp) => {
        if (err) {
            res.send(err);
        }
        res.send(resp[0].posts);
    })

})

router.get('/clearUserDatabase', (req, res) => {
    let Admin = mongoose.mongo.Admin;
    var connection = mongoose.createConnection(
        'mongodb://localhost');
    connection.on('open', function () {
        // connection established
        new Admin(connection.db).listDatabases(function (err, result) {
            // database list stored in result.databases
            var allDatabases = result.databases;
            let dbs = allDatabases.filter(item => {
                return item.name != 'admin';
            })
            dbs.forEach(element => {
                let db = mongoose.connection.useDb(element.name);
                db.dropDatabase();
            });
            res.send({
                message: "All databases removed except admin and master"
            });
        });
    });
})

module.exports = router;


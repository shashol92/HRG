const express = require('express');
const app = express();
const user = require("./users/user");
const posts = require("./posts/post")
const cors = require('cors');

app.use('/users', user);
app.use('/posts', posts);
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send({
        msg: "Hello"
    })
});


app.listen(9000);


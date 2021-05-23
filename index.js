const express = require('express');
const app = express();
const user = require("./users/user");
const posts = require("./posts/post")

app.use('/users', user);
app.use('/posts', posts);

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello JS.................")
});


app.listen(3000);


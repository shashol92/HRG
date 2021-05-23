List of API's to fetch Users, posts and comments data:

Technology used : NodeJS with Express.

Install NodeJS, npm. Install neccessary packages like express, mongoose, nodemon, request
i.e run npm i express, mongoose, nodemon, request.

Server running on port 3000.
run nodemon index.js
run mongodb mongoshell

API's to run to insert data into MongoDB.

Note: There will be one master database with user collection.
      Other databases will be created based on the number of users.
      Ex: If 2 users then there will be 2 databases with a post collections in each database
            mapped with comments with respect to users posts.

API to insert users into users collections 
1. http://localhost:3000/users/insertUsers

API to insert posts into post collections.
1. http://localhost:3000/posts/insertPosts

API to fetch All users: http://localhost:3000/users/getAllUsers

API to fetch All posts: http://localhost:3000/posts/getAllPosts

API to fetch user details: http://localhost:3000/users/userDetails/:id

API to fetch user posts: http://localhost:3000/users/userPosts/:id
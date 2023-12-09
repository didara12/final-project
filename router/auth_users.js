const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let bool = users.some((item) => item.username === username)

    return bool;
}

const authenticatedUser = (username,password)=>{ 
    return users.some(item => (item.username === username && item.password === password))
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username
    const password = req.body.password
    

    if( authenticatedUser(username,password) ){
        let token = jwt.sign({username : username} , "signK" , {expiresIn : 60 * 60})
        req.session.auth = {
            token , username
        }
        return res.status(200).send("User successfully logged in");
    }
    
    res.status(404).send(`username or password are fauls `)

});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const review = req.query.review
    const username = req.session.auth['username']



    for(let key in books){
        
        if(key === isbn){
            
            let obj = books[key]
            obj.reviews[username] = review
            return res.status(200).send("review added")
        } 

    }
    res.status(403).send(`isbn ${isbn} does't exist`)

});


regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn
    const username = req.session.auth['username']

    for(let key in books){
        
        if(key === isbn){
            
            let obj = books[key]
            
            if(!obj.reviews[username]){
                return res.status(403).send(`dosen't exist any review in isbn : ${isbn} `)
            }
            delete obj.reviews[username]
            return res.status(200).send(`review deleted from isbn : ${isbn} `)
        }
    }
    res.status(403).send(`isbn ${isbn} does't exist`)



})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

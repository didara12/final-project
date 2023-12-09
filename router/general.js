const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username
    const password = req.body.password
    if(username && password){
        if(isValid(username)){
            return res.send(`the user ${username} alredy exist `)
        }
        let obj = {
            username: username,
            password: password
        }
        users.push(obj)
        return res.send(`user ${username} regesterd succefuly `)
    }
    res.status(400).send("Username and password are required");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).send(JSON.stringify(books , null , 4)); 
})
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    for(let key in books){
        if(books[key] === books[isbn]){
            return res.status(200).send(JSON.stringify(books[isbn] , null , 4))
        }
    }

    res.status(403).send(`there is no book with the isbn: ${isbn} \n `)
    


  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    let unknown = {}
    if(author === "Unknown"){
        for(let key in books){
            let obj = books[key]
            if(obj.author === "Unknown"){
                unknown[key] = obj
            }
        }
        return res.status(200).send(JSON.stringify(unknown,null,4))
    
    }
    for(let key in books){
        let obj = books[key]
        if(obj.author === author){
            return res.status(200).send(JSON.stringify(obj,null,4))
        }
    }

   res.status(403).send(`there is no book with the author: ${author} \n `)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    for(let key in books){
        let obj = books[key]
        if(obj.title === title){
            return res.status(200).send(JSON.stringify(obj,null,4))
        }
    }

   res.status(403).send(`there is no book with the title: ${title} \n `)

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn
    for(let key in books){
        let review = books[key].reviews
        if(key === isbn){
            return res.status(200).send(JSON.stringify(review,null,4))
        }
    }

   res.status(403).send(`there is no review with the isbn: ${isbn} \n `)
});

module.exports.general = public_users;

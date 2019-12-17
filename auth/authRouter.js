// Import Express and external middleware
const express = require('express');
const bcrypt = require("bcryptjs");

// Import Express middleware
const router = express.Router();

// Import database access
const udb = require('../data/helpers/userModel');

//Import custom middleware
// None at this time

// Export router
module.exports = router;


// ********************************************************
// POST /register
// ********************************************************
router.post('/register',(req,res)=>{
  let userInfo = req.body;

  // hash the password
  // 14 is the number of rounds (2^14) - iterations
  const hash = bcrypt.hashSync(userInfo.password, 14);
  
  // override the plain text password with the hash
  userInfo.password = hash;

  udb.add(userInfo)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });

})

// ********************************************************
// POST /login
// ********************************************************
router.post("/login",(req,res)=>{
  let {username, password} =req.body;
  // console.log("In router.post",username,password);
  udb.findByUname(username)
    .then(user=>{
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: "Logged In" });
      }
      else {
        res.status(401).json({ message: "You shall not pass" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
})
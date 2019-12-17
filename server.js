// ******************************************************
// Import Express and external middleware
// ******************************************************
const express = require('express');
const helmet = require("helmet");

//For client sessions on server
const sessions = require("express-session"); 

//To store sessions in database
const KnexSessionStore = require("connect-session-knex")(sessions);  


// ******************************************************
// Import custom middleware
// ******************************************************
const {defaultResponse, logger} = require('./middleware/custom');


// ******************************************************
// Import database to store the sessions
// ******************************************************
const knex = require("./data/dbConfig.js");


// ******************************************************
// Import specific Routers
// ******************************************************
const authRouter = require("./auth/authRouter"); 
const userRouter = require("./user/userRouter"); 


// ******************************************************
// Configure Session on Server & Cookie to Client
// ******************************************************
const sessionConfiguration = {
  //Default name is sid. Must use non default name to
  //prevent hackers from recognizing from the default
  //cookie name that we are using express-session
  name: "myprj", 

  //Used for encryption. Should really be an environment variable
  secret: "keep it secret, keep it safe!", 

  //This implications with GDPR laws
  //Should be changed dynamically after client has given permission
  //to store cookies
  saveUninitialized: true,
  
  //
  resave: false,

  //Store the sessions info in a database and not in memory
  store: new KnexSessionStore({  // DO NOT FORGET THE new KEYWORD
    knex, // imported from dbConfig.js
    createtable: true,
    clearInterval: 1000 * 30, // defaults to 6000
    sidfieldname: "sid",
    tablename: "sessions",
  }),

  // 
  cookie: {
    maxAge: 1000 * 60 * 2, // session will be good for 2 minutes in milliseconds
    secure: false, // if false the cookie es sent over http/https, if true only sent over https
    httpOnly: true, // if true JS cannot access the cookie on client
  },
};


// ******************************************************
// Create server
// ******************************************************
const server = express();


// ******************************************************
// Use global middleware 
// ******************************************************
server.use(helmet());
server.use(express.json());
server.use(logger);
server.use(sessions(sessionConfiguration)); // this adds a req.session object


// ******************************************************
// Specify general endpoints
// ******************************************************
server.get('/', (req, res) => {
  res.send(`<h2>This is for webauth-i-challenge </h2>`);
});


// ******************************************************
// Use specific Routers
// ******************************************************
server.use("/api", authRouter); 
server.use("/api/users", userRouter); 


// ******************************************************
// ******************************************************
server.use(defaultResponse);
module.exports = server;
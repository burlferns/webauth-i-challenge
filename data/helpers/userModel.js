const db = require('../dbConfig');

module.exports = {
  add,
  findByUname,
  findById,
  find
};

// ******************************************************
// add
// ******************************************************
function add(user) {
  return db('users')
    .insert(user,"id")
    .then(ids=>{
      return findById(ids[0]);
    });
}

// ******************************************************
// findById
// ******************************************************
function findById(id) {
  return db("users")
    .select("id","username")
    .where("id","=",id)
    .first();
}

// ******************************************************
// findByUname
// ******************************************************
function findByUname(username) {
  // console.log("In findByUname",username);
  return db("users")
    .select("id", "username", "password") // make sure to return the password
    // .select("id")
    .where('username','=',username)
    .first();
}

// ******************************************************
// find
// ******************************************************
function find() {
  return db("users").select("id", "username");
}
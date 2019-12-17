const db = require('../dbConfig');

module.exports = {
  add,
  findByUname,
  findById,
  find
};

function add(user) {
  return db('users')
    .insert(user,"id")
    .then(ids=>{
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("users")
    .select("id","username")
    .where("id","=",id)
    .first();
}

function findByUname(username) {
  // console.log("In findByUname",username);
  return db("users")
    .select("id", "username", "password") // make sure to return the password
    .where('username','=',username)
    .first();
}

function find() {
  return db("users").select("id", "username");
}
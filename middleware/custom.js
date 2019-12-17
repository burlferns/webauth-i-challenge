

// ********************************************************
// defaultResponse
// ********************************************************
function defaultResponse(req,res) {
  res.status(404).send(`<h1>You have used an unsupported URL</h1>`)
}


// ********************************************************
// logger
// ********************************************************
function logger(req, res, next) {
  console.log(`[${new Date().toString()}] ${req.method} ${req.originalUrl}`);
  next();
}


// ********************************************************
// ********************************************************
module.exports = {defaultResponse, logger};
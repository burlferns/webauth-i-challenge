// ********************************************************
// ********************************************************
module.exports = {
  defaultResponse, 
  logger, 
  restricted
};


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
// restricted
// ********************************************************
function restricted(req, res, next) {
  console.log("In func restricted & req.session:",req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "You shall not pass!!" });
  }
};



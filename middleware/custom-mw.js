const PostDb = require("../posts/postDb");
const UserDb = require("../users/userDb");

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};

function logger(req, res, next) {
  console.log(
    `At [${new Date().toISOString()}] a ${req.method} request was made to ${
      req.url
    } `
  );

  next();
}

function validateUserId(req, res, next) {
  const id = req.params.id;
  UserDb.getById()
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ message: "invalid user id" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: error.message });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!body.name) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

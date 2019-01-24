// dependencies
const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// api routes
router.use('/api', apiRoutes);

// send all requests to react app
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

module.exports = router;
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { js: '/javascripts/login_public.js', name:"login" });
});


module.exports = router;

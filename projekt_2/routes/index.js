var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { js: '/javascripts/no_script.js', name:"index" ,username:req.session.username});
});


router.get('/unauthorized', function(req, res, next) {
  res.render('unauthorized', { js: '/javascripts/no_script.js', name:"unauth" });
});

module.exports = router;

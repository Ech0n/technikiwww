var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session){
    console.log(req.session)
  }else{
    console.log("SESJA NIE ISTNIEJE")
  }
  if( req.session.authorized)
    res.render('galeria', { js: '/javascripts/galeria.js',name:"galeria" ,username:req.session.username});
  else{
    res.render('unauthorized', { js: '/javascripts/login.js',name:"galeria",username:req.session.username });
  }
});

module.exports = router;

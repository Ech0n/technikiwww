var express = require('express');
var router = express.Router();

var sql = require("sqlite3")


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('user_list',{ js: '/javascripts/user_list_public.js' ,username:req.session.username})
});

//get lista uzytkownikow
router.get('/get', function(req, res, next) {
    var sql = require("sqlite3")
    var db = new sql.Database("./db.sqlite")

    const query = "SELECT username from USERS"
    db.all(query,(err,rows)=>{
        res.send(rows)
    })

    db.close()

});

module.exports = router;

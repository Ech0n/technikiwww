var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")

var express = require('express');
var router = express.Router();

//database
var sql = require("sqlite3")

const salt = 8


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { js: '/javascripts/no_script.js', name:"login" });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { js: '/javascripts/register_public.js', name:"register" });
});


router.post('/api/login', function(req, res, next) {
    var db = new sql.Database("./db.sqlite")


        var query = 'SELECT * FROM "USERS" WHERE username = "'+req.body.name+'" ';
        db.get(query, (err,user)=>{
            if(err)
            {
                console.log(err)
            }
            if(user){
                bcrypt.compare(req.body.password,user.password,(err,result) => {
                    if(result){
                    console.log("Uzytkownik istnieje")
                    req.session.authorized = true
                    req.session.username = req.body.name
                    res.redirect("../")
                    }
                    else{
                        console.log("Podano niepoprawne haslo!")
                        res.render('bad_credentials', { js: '/javascripts/no_script.js', name:"register" })
                    }
                })

            }else{
                res.render('bad_credentials', { js: '/javascripts/no_script.js', name:"register" })
            }
        })
    db.close()
});


router.get('/api/logout', function(req, res, next) {
    req.session.authorized = false
    req.session.username = null
    res.redirect("../")
});

router.post('/api/register', function(req, res, next) {
    console.log(req.body)    

    if ( req.body.name == "" || req.body.email == "" || req.body.password== ""|| !req.body.password){
        res.status(500).end("Please provide proper credentials!")
        return;
    }
    var db = new sql.Database("./db.sqlite")
    const queryfirst = 'SELECT * FROM "USERS" WHERE username = "'+req.body.name+'" or email = "'+req.body.email+'" ';
    db.get(queryfirst, (err,data)=>{
        if(err){
            console.log(err)
        }else{
            if(data){
                console.log("Uzytkownik o podanym pseudonimi juz istnieje")
                res.status(401).json({messgae:"username already exists!"})
                return;
            }
            bcrypt.hash(req.body.password,salt,(err,hash)=>{

                var query = 'INSERT INTO "USERS" (email,username, password,public) VALUES ("'+req.body.email
                +'","'+req.body.name+'","' + hash +'",1);';
                if (err) {
                    console.log("Error while hashing password",req.body.password)
                    res.status(500).end()
                    return
                } 
                db.run(query, (err)=>{
                    if(err){
                    console.log("ERROR while creating new user",err)

                    return;
                    }
                    console.log("New user reigstered")
                    req.session.authorized = true
                    req.session.username = req.body.name
                    res.redirect("../")

                })
                
                })

        }
    })

});




module.exports = router;

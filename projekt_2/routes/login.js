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
  res.render('login', { js: '/javascripts/login_public.js', name:"login" });
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { js: '/javascripts/login_public.js', name:"register" });
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
                        res.status(401).json({message:"Nie poprawne haslo!"})
                    }
                })

            }else{
                console.log("Uzytkownik nie istnieje")
                res.redirect("../login")
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

    if ( req.body.name == "" || req.body.email == "" || req.body.password== ""){
        res.end("Please provide proper credentials!")
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
                db.close()
                return;
            }
            bcrypt.hash(req.body.password,salt,(err,hash)=>{

                var query = 'INSERT INTO "USERS" (email,username, password,public) VALUES ("'+req.body.email
                +'","'+req.body.name+'","' + hash +'",1);';
                if (err) throw new Error("Error while hashing password");
                db.run(query, (err)=>{
                    if(err){
                    console.log("ERROR while creating new user",err)
                    db.close()

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
    db.close()

});




module.exports = router;

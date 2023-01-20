var express = require('express');
var router = express.Router();
const multer = require("multer")
var fs = require('fs');
pathlib = require("path")

const handleError = (err, res) => {
  console.log(err)
  res
    .status(500)
    .contentType("text/plain")
    .end("Cos poszlo nie tak");
};
const path = "./public/images/"



/* GET users listing. */
router.get('/:username',(req,res)=>{
  if(req.session.authorized)
    if(req.session.username == req.params.username){
      res.render('useredit', { js: '/public/javascripts/galeria.js', name:"user" ,username:req.session.username,user:req.params.username});
    }else{
    res.render('user', { js: '/javascripts/galeria.js', name:"user" ,username:req.session.username,user:req.params.username});}
  else
    res.render('unauthorized', { js: '/javascripts/login.js',name:"galeria",username:req.session.username });

})

router.get('/getphotos',(req,res)=>{
  res.send("aaaaa")
})

var upload = multer({
  dest: path+"/temporary",
  onFileUploadComplete: (file)=>{
    console.log("Uploaded file ",file.originalname)
  },
  onFileUploadData: function (file, data) {
    console.log(data.length + ' of ' + file.fieldname + ' arrived')},
  onFileUploadStart: function (file) {
    console.log(file.fieldname + ' is starting ...')
  }
});

router.post('/:username/upload',upload.single("photo"),(req,res)=>{
  console.log("Trying to save an img")

  if(!req.session.authorized){
    res.end()
  return}

  const filepath = path+"users/"+req.session.username
  if (!fs.existsSync(filepath)){
    fs.mkdirSync(filepath);
  }

  if( pathlib.extname(req.file.originalname).toLowerCase() == ".png" || pathlib.extname(req.file.originalname).toLowerCase() == ".jpg"  ){
    fs.rename("./"+req.file.path  , filepath+"/"+req.file.originalname, err=>{
      console.log("Saving",req.file.path,filepath)
      if(err) {handleError(err,res)}
      else{
        res.redirect("/")
      }
    })
  }else{
    fs.unlink(req.file.path,err=>{
      console.log("Not saved")
      if(err)  handleError(err,res)
      else{
        res.status(200).contentType("text/plain").end("File not uploaded")
      }
    })
  }
})

module.exports = router;

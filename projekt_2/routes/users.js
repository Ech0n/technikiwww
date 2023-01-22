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
router.get('/user/:username',(req,res)=>{
  if(req.session.authorized)
  {
    if(req.session.username == req.params.username){
      res.render('useredit', { js: '/javascripts/galeria.js',  username:req.session.username,user:req.params.username});
    }else
    {
    res.render('user', { js: '/javascripts/galeria.js' ,username:req.session.username,user:req.params.username});
  }
  }
  else{
    res.render('unauthorized', { js: '/javascripts/no_script.js',name:"galeria",username:req.session.username });
  }

})



router.get('/getphotos/:user', async (req,res)=>{

  username = req.params.user
  try{

    folderpath = pathlib.join(__dirname,
      '../public/images/users/'+username+"/").split("%20").join(" ");
    if(!fs.existsSync(folderpath))
    {
      res.json("")
      return
    }
    fs.readdir(folderpath,(err,names)=>{
      console.log(names)
      const files = names.map(function (filename) {
        filepath = folderpath + '/' + filename;
        return {name:filename.slice(0,filename.length-pathlib.extname(filename).length),img:fs.readFileSync(filepath),ext:pathlib.extname(filename)}; //updated here
      });
      console.log("Sending Images")
      res.json(files)
    })

  }catch(ex){
    console.log("ERROR while reading image dir!",ex)
  }


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

router.post('/user/:username/upload',upload.single("photo"),(req,res)=>{
  console.log("Trying to save an img",req.body)

  //Sprawdza czy poprawny uzytkownik probuje wyslac zdjecie
  if(!req.session.authorized){
    console.log("Not authorized")
    res.end()
  return}else if(req.session.username != req.params.username){
    console.log("Wrong user!",req)
    res.end()  
    return
  }
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

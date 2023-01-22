var express = require('express');
var router = express.Router();
const multer = require("multer")
var fs = require('fs');
const pathlib = require("path")

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
      res.render('useredit', { js: '/javascripts/galeria.js', username:req.session.username,user:req.params.username});
    }else
    {
    res.render('user', { js: '/javascripts/galeria.js' ,username:req.session.username,user:req.params.username});
  }
  }
  else{
    res.render('unauthorized', { js: '/javascripts/no_script.js',name:"galeria",username:req.session.username });
  }

})


//Sciezka zwracajaca w odpowiedzi uzytkownikowi tablice zdjec danego uzytkownika
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

//multer - middleware umozliwiajacy obsluge odbierania duzych plikow (w tym przypadku zdjec) od klienta
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

//Sciezka ktora pozwala uzytkownikowi na wyslanie zdjecia do serwera
router.post('/user/:username/upload',upload.single("photo"),(req,res)=>{
  console.log("Trying to save an img",req.body)
  if(!req.file){
    console.log("Nie podano pliku!")
    res.render('error',{message:"Nie wybrano pliku do wyslania!",error:{status:404,stack:0}})
    return;
  }

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
  //Sprawdza czy istnieje sciezka do folderu w ktorym mozna zapisac zdjecia jezeli nie to ja tworzy
  if (!fs.existsSync(filepath)){
    fs.mkdirSync(filepath);
  }

  //Zapis zdjecia na dysku odbywa sie po przez zmienienie nazwy sciezki(razem z nazwa pliku) z folderu tymczasowego do docelowego
  if( pathlib.extname(req.file.originalname).toLowerCase() == ".png" || pathlib.extname(req.file.originalname).toLowerCase() == ".jpg"  ){
    fs.rename("./"+req.file.path  , filepath+"/"+req.file.originalname, err=>{
      console.log("Saving",req.file.path,filepath)
      if(err) {handleError(err,res)}
      else{
        res.redirect("/")
      }
    })
  }else{
    //Jezeli format pliku to nie png/jpg to go nie zapisujemy
    fs.unlink(req.file.path,err=>{
      console.log("Not saved")
      if(err)  handleError(err,res)
      else{
        res.status(200).contentType("text/plain").end("File not uploaded")
      }
    })
  }
})

//Sciezka umozliwa usuniecie zdjecia
router.delete('/delete/:photo', function(req, res, next) {
  var folder = path+"users/"+req.session.username
  fs.readdir(folder,(err,photos)=>{
    if(err){
      console.log("Napotkano problem przy usuwaniu pliku!")
      req.status(500).end()
      return
    }
    photos.forEach(photo=>{
      if(req.params.photo == pathlib.parse(photo).name)
      {
        fs.unlink((folder+"/"+photo),(err)=>{
          if(err)  handleError(err,res)
          else res.status(200).end("File Deleted")
        })
      }
    })
    
  })
})

module.exports = router;

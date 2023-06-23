const multer = require('multer')
const express = require('express')
const path = require('path');
const app = express();
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
const upload = multer({ storage: storage });
app.post('/upload',upload.single('file'),(req,res)=>{
    const file=req.file;
    console.log(file)
    if(!file) res.send("Not uploaded");
    else res.send("Uploaded");
})
app.get('/download/:filename',(req,res)=>{
    const filename = req.params.filename
    console.log(filename)
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath, (err) => {
        if (err) {
          res.status(404).send('File not found.');
        }
      });
})
app.get('/',(req,res)=>{
    res.send(`<form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" />
                <button type="submit">noice</button>
                </form>
                <a href="/download/main (5).cpp">Download File</a>`)
})
app.listen(3000,()=>{
    console.log("Server running on PORT 3000");
})
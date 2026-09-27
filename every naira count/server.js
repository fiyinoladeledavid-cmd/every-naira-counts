const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json({limit:'10mb'}));

if(!fs.existsSync('uploads')) fs.mkdirSync('uploads',{recursive:true});
if(!fs.existsSync('data')) fs.mkdirSync('data',{recursive:true});
if(!fs.existsSync('public')) fs.mkdirSync('public',{recursive:true});

let dbPath='data/db.json';
if(!fs.existsSync(dbPath)){
 fs.writeFileSync(dbPath, JSON.stringify({
  users:[{id:1,name:'Owner',bank:'Owner',phone:'080000',email:'owner',pass:'owner123',code:'OWNER1',main:0,sav:0,points:0,refs:[],mem:true,owner:true}],
  prods:[],combos:[],txs:[]
 }));
}

app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.use(express.static(path.join(__dirname,'public')));

const storage=multer.diskStorage({
 destination:(req,file,cb)=>cb(null,'uploads/'),
 filename:(req,file,cb)=>cb(null, Date.now()+'-'+file.originalname)
});
const upload=multer({storage});

const read=()=>JSON.parse(fs.readFileSync(dbPath,'utf8'));
const write=(d)=>fs.writeFileSync(dbPath,JSON.stringify(d));

app.post('/api/upload', upload.single('photo'), (req,res)=>{
  res.json({url:'/uploads/'+req.file.filename});
});

app.get('/api/data',(req,res)=>res.json(read()));
app.post('/api/data',(req,res)=>{write(req.body);res.json({ok:true});});

app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log('OK '+PORT));
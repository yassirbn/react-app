var express =require('express'); 
var user = require('./router/user');
var product = require('./router/products');
var order = require('./router/order');
var logger = require('morgan');
var category = require('./router/category');
var db=require('./models/db') ; 
var app=express() ;
var cors = require('cors')
var bodyParser =require('body-parser') ;
var VerifyToken= require('./verifyToken');
const config =require('./config.json');
const multer = require('multer');
var fs = require('fs');
const upload=multer({dest:__dirname+'/uploads/images'})
app.set('secretKey', 'test'); // jwt secret token
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(cors());

app.use("/users",user);
app.use("/prods",VerifyToken,product);
app.use("/orders",VerifyToken,order);
app.use("/categories",category);
app.post('/file_upload', upload.single("file"), function (req, res) {

    var file = __dirname + '/uploads/images' + req.file.originalname;

    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.error(err);
                var  response = {
                    message: 'Sorry, file couldn\'t be uploaded.',
                    filename: req.file.originalname
                };
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.originalname
                };
            }
            res.end(JSON.stringify(response));
        });
    });
})

app.use(function (req, res, next) {
    var err = new Error('Not Found');// handle errors
    err.status = 404;
    app.use(function (err, req, res, next) {
        next(err);
        console.log(err);
    });
    if (err.status === 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message: "Something looks wrong :( !!!"});
});


app.get('/',function(req,res){
    res.send('bonjour');
});

app.get('/home',function(req,res){
    res.send('bonjour yassir');
});



app.listen(config.port,function(){

    console.log("start");
});
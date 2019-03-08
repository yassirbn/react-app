var express =require('express'); 
var bodyParser =require('body-parser')
var UserModel = require('../models/usermodel');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var randtoken =require('rand-token');
const config =require('../config.json')
var router=express.Router() ;
var VerifyToken= require('../verifyToken');
const tokenList={};
var fs =require('fs');

router.get('/',function(req,res){

    res.send({"info":"welcome to my user server"});
})


router.get('/all',function(req,res){

    UserModel.find({},function(err,result){
        if(err){
            res.send({
                data:{},
                state:"no",
                msg:err
            })
        }else{
            res.send({
                data:result
            })
        }
    })
});

router.post('/login',function(req,res){
    UserModel.findOne({email: req.body.email}, function (err, userInfo) {
        if (!userInfo) {
            console.log("user not found " + req.body.email)
            res.json({status: "error", message: "Invalid email/password!!!", data: null});
            next(err);
        } else {
            console.log("user found " + userInfo._id)
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({id: userInfo._id}, config.secret, {expiresIn: '1h'});

                var refreshToken = randtoken.uid(256)
                tokenList[refreshToken] = userInfo._id
                console.log({
                    status: "success",
                    message: "user found!!!",
                    data: {user: userInfo, token: token, refreshToken: refreshToken}
                })
                res.json({
                    status: "success",
                    message: "user found!!!",
                    data: {user: userInfo, token: token, refreshToken: refreshToken}
                });
            } else {
                res.json({status: "error", message: "Invalid email/password!!!", data: null});
            }
        }

    });

});

router.post('/add',function(req,res){
    var user = new UserModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password
    });
    user.save(function(err){
        if(err){
            res.send({state:"no",msg:err});
        }else{
            res.send({state:"yes",msg:"saved baby"});
        }

    })
});

router.put('/update/:id',VerifyToken,function(req,res){
    UserModel.findByIdAndUpdate(req.params.id,{firstName:req.body.firstName,lastName:req.body.lastName,phone:req.body.phone,email:req.body.email,password:req.body.password},function(err){
        if(err){
            res.send({state:"no",msg:err});
        }else{
            res.send({state:"yes",msg:"updated baby"});
        }
    })
});

router.delete('/remove/:id',VerifyToken,function(req,res){
    UserModel.remove({_id:req.params.id},function(err){
        if(err){
            res.send({state:"no",msg:err});
        }else{
            res.send({state:"yes",msg:"deleted baby"});
        }
    })
});

router.post('/token', function (req, res,next) {

    UserModel.findOne({email: req.body.email}, function (err, userInfo) {
        if (!userInfo) {
            console.log("user not found " + req.body.email)
            res.json({status: "error", message: "Invalid email/password!!!", data: null});
            next(err);
        } else {

            // refresh the damn token
            const postData = req.body
            // if refresh token exists
            if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
                const user = {
                    "id": userInfo._id,
                }
                const token = jwt.sign(user, config.secret, {expiresIn: config.tokenLife})
                const response = {
                    "token": token,
                }
                // update the token in the list
                tokenList[postData.refreshToken].token = token
                res.status(200).json(response);
            } else {
                res.status(404).send('Invalid request')
            }


        }

    });



})

router.post('/reject', function (req, res, next) {
    var id = req.body.id
    var refreshToken = req.body.refreshToken
    if ((refreshToken in tokenList) && (tokenList[refreshToken] == id)) {
        delete tokenList[refreshToken]
    }
    res.sendStatus(204).end()
})



module.exports=router;

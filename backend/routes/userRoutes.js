var express=require('express');

var route=express.Router();

var ctrlUser=require('../controllers/userController');
const jwthelper=require('../config/jwtHelper');


route.post('/addUser',ctrlUser.createUser);
route.post('/auth',ctrlUser.authenticate);
route.get('/userinfo',jwthelper.verifyJwtToken,ctrlUser.userProfile);

route.get('/getInfo/:userId',ctrlUser.getUser);

module.exports=route;
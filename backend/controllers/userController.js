const mongoose=require('mongoose');
require('../model/userModel');
var User=mongoose.model("User");
const passport=require('passport');
const jwt=require('jsonwebtoken');
const _ = require('lodash');


module.exports.createUser=(req,res,)=>{

    const newUser=new User({
        firstName:req.body.fname,
        lastName:req.body.lname,
        email:req.body.email,
        password:req.body.password
    });

    return newUser.save().then((doc)=>{
        return res.status(200).json({
            success:true,
            message:'New User Registered',
            User:doc
        });
    })
    .catch((err)=>{
        res.status(500).json({
            success:false,
            message:'Error registering new User',
            err:err.message
        });
    });

}

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err)
        {
            return res.status(404).json(err);
        }
    
        if(user)
        {
            return res.status(200).json({"token":jwt.sign({_id:user._id},"ABC123",{expiresIn:'3000m'}),"id":_.pick(user,['_id'])})
        }
        else 
        return res.status(401).json(info);
    })
    (req,res);
};

module.exports.userProfile=(req,res,next)=>{
    User.findOne({_id:req._id},(err,user)=>{
        if(err)
            return res.status(404).send(err);
        
        else if(!user)
            return res.status(403).json({status:false,message:'email not found'})
        
        else
            return res.status(200).json({status:true,user:_.pick(user,['_id','firstName','lastName','email'])});
    });

}

module.exports.getUser=(req,res)=>{
    const id=req.params.userId;
    User.findById(id).then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'User information',
            User:docs
        })
    })
    .catch((err)=>{
        res.status(500).json({
            success:false,
            message:'No Records found',
            error:err.message
            
        });
    });
}
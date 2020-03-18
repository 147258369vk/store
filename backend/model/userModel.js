const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
const bcrypt=require("bcrypt");


const users=mongoose.Schema({
    firstName:{
        type:String,
        required:"First Name should be filled",
        match:[/^[A-Za-z]+$/,"Please Enter only Alphabet"]
    },
    lastName:{
        type:String,
        required:"Last name should be filled",
        match:[/^[A-Za-z]+$/,"Please Enter only Alphabet"]
    },
    email:{
        type:String,
        required:"Email should  be filled",
        
    },
    password:{
        type:String,
        required:'Password should be entered',
    },
    saltString:String
    
});

users.pre('save',function(next){
    bcrypt.genSalt(5,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password=hash;
            this.saltString=salt;
            next();
        });
    });
});

users.methods.verifyPassword=function(password){
    return bcrypt.compareSync(password,this.password);
}

mongoose.model("User",users);
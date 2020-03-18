require('./config/db');
require('./config/passportConfig')
const express=require('express');
const bodyparser=require('body-parser');
const passport=require('passport');
const cors=require('cors');
var apiroutes=require('./routes/userRoutes');
const path=require('path');


var app=express();
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use('/',apiroutes);

app.use("/",express.static(path.join(__dirname,"angular-src")));

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');
    next();
})

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,"angular-src","index.html"));
});
app.use(passport.initialize());

const port=process.env.PORT || 4200;

app.listen(port,()=>{console.log(`Server running at ${port}`)});


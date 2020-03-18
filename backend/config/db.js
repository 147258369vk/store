const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://store:store@123@cluster0-g6zq9.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Database connected");
})
.catch((error)=>{
    console.log('Error in connecting to database' +error);
});

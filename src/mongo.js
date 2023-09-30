const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/authenticate")
.then(()=>{
    console.log("mongo connected")
})
.catch(()=>{
    console.log("error")
})

const Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
})

const Collection=new mongoose.model("auths",Schema)

module.exports=Collection

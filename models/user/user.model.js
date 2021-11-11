const mongoose = require("mongoose");

const {Schema,model}=mongoose;

const userSchema=new Schema({
    userName:{
        type:String,
        trim:true,
        // required: true
    },
    Email: {
        type: String,
        trim: true,
        required: true
    },
     Password: {
        type: String,
        required: true
    },
    ProfilePic : {
        type: String,
    },
     Address: {
         type: String,
    },
    Contact:{
        type: String,
    },
    role:{
        type:String,//user , admin
    }
});

const UserModal = model("UserModal",userSchema);

module.exports=UserModal;
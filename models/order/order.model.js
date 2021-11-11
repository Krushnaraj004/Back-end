const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const orderSchema = new Schema({
   Product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"ProductModal",
   },
   orderDate:{
       type:Date,
   },
   transactionId:{
       type:String,
   },
   address:{
       type:String,
   },
   user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"UserModal",
   },
});

const orderModal = model("orderModal", orderSchema);

module.exports = orderModal;
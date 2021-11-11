const express = require('express')
const app = express();
const mongoose=require("mongoose");
// console.log('process.env:',process.env);
require("dotenv").config({path:"./.env"})
//middlewares
const cors=require("cors");


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJjNzdjYzNhYjllODNmNmNjNDA1ZWEiLCJpYXQiOjE2MzE2MzE0ODJ9.6JIiIQJ8Etn10pk69sTeue6B0PRkNRZrFHmvXSAHs9o";
console.log("checking token",token.length);

const connectToDb= async()=>{
    try{
        await mongoose.connect(process.env.MONGOBURI,{
            useFindAndModify:true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log("connected to DB");
    }
    catch(error){
        console.log("error",error);
        console.log("couldnt connect to Db");
    }
};
connectToDb();
//set up Mongo connection

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.get("/",(req,res)=>{
    res.send("you are good to go buddy");
});

app.use((req, res, next) => {
    console.log("query", req.query);
    next();
});

const ProductRoutes=require("./routes/product/product.routes");
const userRoutes=require("./routes/user/user.routes");
const orderRoutes = require("./routes/order/order.routes");
const wishlistRoutes = require("./routes/wishlist/wishlist.routes");
app.use(userRoutes);
app.use(ProductRoutes);
app.use(orderRoutes);
app.use(wishlistRoutes);

//import routes
const port = process.env.PORT || 4000;

app.listen(port, () => {console.log(`Welcome to server port ${port}`)});
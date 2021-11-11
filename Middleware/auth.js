require("dotenv").config({ path: "../.env" });
const User = require("../models/user/user.model");
const jwt = require("jsonwebtoken");
console.log(process.env.SECRET_KEY);
//authentication for protected routes
const auth = async (req, res, next) => {
    //middleware function
    try {
        const token = req.header("Authorization").replace("Bearer ", ""); //getting token from headers & deleting bearer from token
        // console.log('token',token.length);
        if (!token) {
            const error = "Invalid authorization token!";
            res.json({ error, code: 400 });
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY); // verfying if user have this token
        const user = await User.findOne({ _id: decoded._id }); // fnding user by id, the id we gave while generating tokens

        if (!user) {
            const error = "Invalid user!";
            res.json({ error, code: 404 });
        }

        req.user = user; // storing user in req object so tht we can acces it later
        next(); 
    } catch (err) {
        console.log("err: ", err);
        const error = "Acess denied!";
        res.json({ error, code: 401 });
    }
};
module.exports = auth;

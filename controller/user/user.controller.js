const UserModal = require("../../models/user/user.model");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv").config({ path:"C:\Users\HP\Desktop\E-Commerce Project\BackEcomm\.env" });

exports.signinController = async (req, res) => {
    try {
        const user = await UserModal.findOne({ Email: req.body.Email });
        if (!user)
            return res.json({ error: "Invalid user", data: null, code: 404 });

        //check password
        const comparePassword = await bcrypt.compare(
            req.body.Password,
            user.Password
        );

        if (!comparePassword)
            return res.status(404).json({ error: "Invalid user", data: null, code: 404 });

        //generate token
        const token = await jwt.sign(
            { _id:user._id.toString()},
            process.env.SECRET_KEY
        );

        user.Password = undefined;

        res.json({ data: { user, token }, err: null, code: 200 });
    } catch (err) {
        console.log("err: ", err);
        res.json({ error: "Something went wrong", data: null, code: 500 });
    }
};

exports.signupController = async (req, res) => {
    const isAdmin = req.query.isAdmin; // true || false

    const $isAdmin = isAdmin === "true" ? true : false;
    try {

        if (!$isAdmin) {
            const isExist = await UserModal.findOne({Email:req.body.Email});
            if(isExist)
            {
                return res.json({ error: "User already exists",
                 data: null, code: 400 });
            }
            const newUser = new UserModal({
                Email: req.body.Email,
                Password: req.body.Password,
                role: "USER",
            });
            const salt = await bcrypt.genSalt(); //encrypted string
            const hashedPassword = await bcrypt.hash(newUser.Password, salt);
            newUser.Password = hashedPassword;
            await newUser.save();
            newUser.Password=undefined;
            res.json({ data: newUser, err: null, code: 200 });
        } else {
            const newUser = new UserModal({
                Email: req.body.Email,
                Password: req.body.Password,
                role: "ADMIN",
            });
            const salt = await bcrypt.genSalt(); //encrypted string
            const hashedPassword = await bcrypt.hash(newUser.Password, salt);
            newUser.Password = hashedPassword;
            await newUser.save();
            res.status(404).json({ data: newUser, err: null, code: 200 });
        }
    } catch (err) {
        console.log("err: ", err);
        res.json({ error: "Something went wrong", data: null, code: 500 });
    }
};
 
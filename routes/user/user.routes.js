const router = require("express").Router();

//controllers
const {signinController,signupController}=require("../../controller/user/user.controller");
//routes
//signup
router.post("/api/signin",signinController);

//signup
router.post("/api/signup", signupController);


//signup for admin
router.post("/api/admin/signup", signupController);

module.exports=router;
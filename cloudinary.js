
const cloudinary=require("cloudinary").v2;
cloudinary.config({
    cloud_name:"dkp4xl2fs",
    api_key:"675774863636397",
    api_secret:process.env.api_secret,
});

module.exports ={ cloudinary };
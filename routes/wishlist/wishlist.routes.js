const router = require("express").Router();

const auth = require("../../Middleware/auth");
//controllers
const { 
    addwishlistController,
    getWishlistController,
    deleteWishlistController

 } = require("../../controller/wishlist/wishlist.controller");
//routes
//add
router.post("/api/add/wishlist", auth,addwishlistController);

// //update
// router.put("/api/update/wishlist", auth,updatewishlistController);

//delete
router.delete("/api/remove/wishlist", auth,deleteWishlistController);

//fetch
router.get("/api/get/wishlist", auth, getWishlistController);
module.exports = router;
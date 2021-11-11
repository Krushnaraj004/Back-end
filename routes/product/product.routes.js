
const router = require('express').Router();
const auth = require("../../Middleware/auth");
//controllers
const {
    addProductController,
    updateProductController,
    deleteProductController,
    getProductController,
    fetchUserProductController,
} = require("../../controller/product/product.controller");
//routes
//add
router.post("/add/Product",auth,addProductController);

//update
router.put("/update/Product", auth, updateProductController);

//delete
router.delete("/remove/Product", auth, deleteProductController);

//fetch admin
router.get("/get/Product", auth, getProductController);

//fetch user
router.get("/get/user/Product", fetchUserProductController);

module.exports = router;
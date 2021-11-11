const router = require("express").Router();

const auth = require("../../Middleware/auth");
//controllers
const {
    placeOrderController,
    getorderController,
    deleteOrderController,
} = require("../../controller/order/order.controller");
//routes
//add
router.post("/api/add/order", auth, placeOrderController);

// //update
// router.put("/api/update/order", auth, updateorderController);

//delete
router.delete("/api/remove/order", auth, deleteOrderController);

//fetch
router.get("/api/get/order", auth, getorderController);
module.exports = router;
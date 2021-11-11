const orderModal=require("../../models/order/order.model");

exports.placeOrderController= async(req,res)=>{
    const userId=req.user._id;
    const user = req.user;
    try{
        
        if (user.role !== "USER") {
            return res.status(401).json({
                error: "Access denied ",
                data: null,
                code: 401,
            });
        }
       const newOrder=new orderModal({
           Product: req.body.ProductId,
           orderDate:req.body.todaysDate,
           transactionId:req.body.transactionId,
           address:req.body.address,
           user:userId,
       });
       await newOrder.save();
       res.json({date:newOrder,code:200});
    }
    catch(error)
    {
        console.log("error",error);
    }
}

exports.deleteOrderController = async (req,res)=>{
    const orderId = req.query._id
    try {
        await orderModal.findByIdAndDelete({ _id: orderId })
        res.json({ msg: "Successfully delete from database", error: null, code: 200 });
    } catch (error) {
        console.log("error =>", error);
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
};
exports.getorderController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !== "USER") {
            return res.status(401).json({
                error: "Access denied ",
                data: null,
                code: 401,
            });
        }
        const myOrders = await orderModal.find({ user: user._id }).populate(
            "Product"
        );
        res.json({ data: myOrders, code: 200 });
    } catch (error) {
        console.log("error: ", error);
        res
            .status(500)
            .json({ error: "something went wrong", data: null, code: 500 });
    }
};

const WishlistModal = require("../../models/wishlist/wishlist.model");

exports.addwishlistController = async (req, res) => {
    const userId = req.user._id;
    const user = req.user;

    try {
        if (user.role !== "USER") {
            return res.status(401).json({
                error: "Access denied ",
                data: null,
                code: 401,
            });
        }
        const Wishlistmodal = new WishlistModal({
            Product: req.body.ProductId,
            user: userId,
        });
        await Wishlistmodal.save();
        res.json({ date: Wishlistmodal, code: 200 });
    } catch (error) {
        console.log("error: ", error);
        res
            .status(500)
            .json({ error: "something went wrong", data: null, code: 500 });
    }
};

exports.getWishlistController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !== "USER") {
            return res.status(401).json({
                error: "Access denied ",
                data: null,
                code: 401,
            });
        }
        const getWishlistModel = await WishlistModal.find({ user: user._id }).populate(
            "Product"
        );
        console.log(getWishlistModel);
        res.json({ data: getWishlistModel, code: 200 });
    } catch (error) {
        console.log("error: ", error);
        res
            .status(500)
            .json({ error: "something went wrong", data: null, code: 500 });
    }
}

exports.deleteWishlistController = async (req, res) => {
    const wishlistId = req.query._id;
    try {
        await WishlistModal.findByIdAndDelete({ _id: wishlistId })
        res.json({ msg: "Successfully delete from database", error: null, code: 200 });
    } catch (error) {
        console.log("error =>", error);
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
};
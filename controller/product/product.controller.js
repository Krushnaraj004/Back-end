    const ProductModal = require("../../models/products/product.model");
const { cloudinary } = require("../../cloudinary");

exports.addProductController = async (req, res) => {
    const user = req.user;
    try {
        if(user.role!=="ADMIN")
        {
            return res.json({error:"Access Denied",data:null,code:401});
        };
        const uploadResponse = await cloudinary.uploader.upload(req.body.Picture, {
            upload_preset: "test-media",
        });
        console.log(uploadResponse);
        const Product = new ProductModal({
            ProductName:req.body.ProductName,
            Price: req.body.Price,
            Picture: uploadResponse.secure_url,
            Description: req.body.Description,
        });
        console.log("Product",Product);
        await Product.save();
       res.json({data:Product,err:null,code:200});
    } catch (err) {
        console.log("err:", err);
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
};

exports.updateProductController = async (req, res) => {
    const user = req.user;
    const getbody= req.body;
    const getId=req.query._id;
    const cloudId = req.query.cloudId;
    try {
        if (user.role !== "ADMIN") {
            return res.json({ error: "Access Denied", data: null, code: 401 });
        }
        else{
            await cloudinary.uploader
                .destroy(cloudId)
                .then((result) => {  
                    console.log("image detele and updated successfully");
                     })

                .catch((error) => {
                    console.log("unable to delete");
                });
             const uploadResponse = await cloudinary.uploader.upload(req.body.Picture, {
            upload_preset: "test-media",
        });
            getbody.Picture = uploadResponse.secure_url;
        }
     
        // console.log("data", data);
        const user = await ProductModal.findByIdAndUpdate({ _id: getId }, { $set: getbody }, { new: true });

        res.json({ data: user, err: null, msg:"sucessfully update" , code: 200 });

        
    } catch (err) {
        console.log("err:", err);
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
};

exports.getProductController = async (req, res) => {
    const user = req.user;

    try {
        if (user.role !== "ADMIN") {
            return res.json({ error: "Unproper", data: null, code: 401 });
        };
        const Product = await ProductModal.find({});
        // await Product.save();
        res.json({ data: Product, err: null, code: 200 });
    } catch (err) {
        console.log("err:", err);
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
};
exports.fetchUserProductController = async (req, res) => {
    const user = req.user;
    try {
        const Product = await ProductModal.find({});

        console.log(Product);
        res.json({ data : Product, error: null, code: 200 });
    } catch (error) {
        console.log("error =>", error);
        res.status(500).json({ error: "something went wrong", data: null, code: 500 });
    }
};

exports.deleteProductController = async (req, res) => {
    const user = req.user;
    const ProductId=req.query._id;
    
    try {
        if (user.role !== "ADMIN") {
            return res.json({ error: "Access Denied",
             data: null, code: 401 });
        };
      
     await ProductModal.findByIdAndDelete({ _id: ProductId });
    
        res.json({ data: {message:"Succcessfully deleted"}, err: null, code: 200 });
    } catch (err) {
        console.log("err:", err);
        res.json({ error: "something went wrong", data: null, code: 500 });
    }
};
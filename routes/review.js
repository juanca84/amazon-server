const router = require("express").Router();
const Review = require("../models/review");
const Product = require("../models/product");
const verifyToken = require("../middlewares/verify-token");
const upload = require("../middlewares/upload-photo");

router.post("/reviews/:productID", [verifyToken, upload.single("photo")], async (req, res) => {
    try {
        const review = new Review();
        console.log(req.body);
        review.headline = req.body.headline; 
        review.body = req.body.body;
        review.rating = req.body.rating;
        review.photo = req.file.location;
        review.userID = req.decoded._id;
        review.productID = req.params.productID;

        await Product.update({_id: req.params.productID},{ $push: { reviews: review._id } });
        const savedReview = await review.save();
        if (savedReview) {
            res.json({
                success: true,
                message: "Successfully Added review"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
});

router.get("/reviews/:productID", async(req, res) => {
    try {
        const productReview = await Review.find({
            productID: req.params.productID
        })
        .populate('user')
        .exec();

        res.json({
            success: true,
            reviews: productReview
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;
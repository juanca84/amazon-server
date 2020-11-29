const router = require("express").Router();
const Address = require("../models/address");
const verifyToken = require("../middlewares/verify-token");

// POST request
router.post("/addresses", verifyToken, async (req, res) => {
    try {
        let address = new Address();
        address.user = req.decoded._id;
        address.country = req.decoded.country;
        address.fullName = req.decoded.fullName;
        address.streetAddress = req.decoded.streetAddress;
        address.city = req.decoded.city;
        address.state = req.decoded.state;
        address.zipCode = req.decoded.zipCode;
        address.phoneNumber = req.decoded.phoneNumber;
        address.deliverInstructions = req.decoded.deliverInstructions;
        address.securityCode = req.decoded.securityCode;

        await address.save();
        res.json({
            success: true,
            message: "successfuly added an address"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})


// GET request 
router.get("/addresses", verifyToken, async (req, res) => {
    try {
        let addresses = await Address.find({ user: req.decoded._id });

        res.json({
            success: true,
            addresses: addresses
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });    
    }
})
module.exports = router;
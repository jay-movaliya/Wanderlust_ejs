const express = require("express");
const router = express.Router();
const Listing = require("../models/listings.js");

router.route("/").get(async(req,res)=>{
    const allListing = await Listing.find({});
    const filteredListings = allListing.map(listing => ({
        title: listing.title,
        image: listing.image,
        country: listing.country,
        location: listing.location
    }));
    res.send(filteredListings);
})

module.exports = router;
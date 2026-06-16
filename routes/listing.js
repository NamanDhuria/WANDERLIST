const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn , isOwner, validatelisting} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js")

const upload = multer({storage});

const listingController = require("../controllers/listings.js");

router
 .route("/")
 .get(wrapAsync(listingController.index)) //index
 .post(//create
    isloggedIn,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.createListing)
);

// NEW
router.get("/new", 
    isloggedIn, listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync(listingController.showListing))// show
.put( //update
    isloggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.updateListing))
.delete(
    isloggedIn, 
    wrapAsync(listingController.destroyListing)
);

// EDIT
router.get("/:id/edit",
    isloggedIn,
    isOwner,
    wrapAsync(listingController.editListing)
);

module.exports = router;
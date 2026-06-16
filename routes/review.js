const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExxpressError.js");
const Review = require("../models/review.js");
const { ListingSchema } = require("../Schema.js");
const Listing = require("../models/listing.js");
const {validateReview, isloggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//REVIEWS 
router.post(
    "/",
    isloggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

// delete review route
router.delete("/:reviewId",
    isReviewAuthor, 
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;
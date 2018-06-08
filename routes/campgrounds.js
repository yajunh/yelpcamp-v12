var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



//=========================================================
//CAMPGROUNDS ROUTES
//=========================================================

//Index - show all campgrounds
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
        
    }
    else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});  
    }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res) {
    //get data from form and add to campground array
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var description = req.body.description;
    var author = {
                    id: req.user._id,
                    username: req.user.username
                 };
    var newCampGrounds = {name: name, image: image, price: price, description: description, author: author};
    //create a new campground and save to DB
    Campground.create(newCampGrounds, function(err, newCampGround) {
        if (err) {
            console.log(err);
        } else {
            //redirect to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


//SHOW - show more information about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        //console.log(pickedCampground);
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("/campgrounds");
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});


//Edit Campgrounds route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});



//Update Campgrounds route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            //redirect somewhere like show page
            res.redirect("/campgrounds/" + req.params.id);
        }
        
    });
});


//destroy campgrounds route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
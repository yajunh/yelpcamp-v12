var mongoose = require("mongoose");

//CampgroundSchema setup
var campgroundSchema = new mongoose.Schema({
    name: "string",
    image: "string",
    price: "string",
    description: "string",
    author: {
                id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                username: "string"
            },
    comments: [
                {   
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "comment"
                }
              ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
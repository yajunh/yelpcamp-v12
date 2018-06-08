var mongoose = require("mongoose");

//CommentSchema setup
var commentSchema = new mongoose.Schema({
    text: "string",
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: "string"
    }
});

module.exports = mongoose.model("comment", commentSchema);
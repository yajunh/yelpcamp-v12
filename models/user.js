var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
                        username: "string",
                        password: "string"
                 });
                 
                 
userSchema.plugin(passportLocalMongoose);                 
                 

module.exports = mongoose.model("User", userSchema);
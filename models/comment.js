var mongoose =require("mongoose");

var commentSchema = new mongoose.Schema({
	title:String,
	author:String,
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
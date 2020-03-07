var mongoose =require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
	{
		name:"akash",
		image:"https://images.unsplash.com/photo-1563387852576-964bc31b73af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=782&q=80",
		description:"I have to study hard"
	},
	{
		name:"deepa",
		image:"https://images.unsplash.com/photo-1559628233-e9eb5d83882f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
		description:"I have to study hard"
	},
	{
		name:"abb",
		image:"https://images.unsplash.com/photo-1582531763345-e7af302cab2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
		description:"I have to study hard"
	}
]

function seedDB(){
// 	remove all campgrounds
	Campground.deleteMany(function(err){
		if (err){
			console.log(err);
		}
	console.log("removed campgrounds!");
		data.forEach(function(seed){
	Campground.create(seed, function(err, campground){
		if(err){
			console.log(err);
		} else{
			console.log("added a campground");
// 			create a comment
			Comment.create(
			{title:"this is the first comment",
			 author:"rock"	
			} , function(err, comment){ 
				if (err){
					console.log(err);
				} else{
					console.log("Created new comment");
					campground.comments.push(comment);
					campground.save();
				}
				
			})
		}
		
	});
});

				

	});
}
module.exports = seedDB;
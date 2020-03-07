var express 	= require("express"),
 	app 		= express(),
	bodyParser 	= require("body-parser"),
 	mongoose 	= require("mongoose"),
	Campground 	= require("./models/campground.js"),
	Comment 	=require("./models/comment.js"),
	seedDB		= require("./seeds");
	
seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3", 
{useNewUrlParser: true,
useUnifiedTopology: true });

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


//creating db
// Campground.create({
// name: "Salmon Creek",	image:"https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
// description:"This a Creek with no bathroom and water"	
	
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else{
// 		console.log("NEWLY CREATED CAMPGROUND");
// 		console.log(campground);	
// 	}
// });

// var campgrounds =[
		
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
// 		{name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
//         {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
//         {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
//         {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
// 	];

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds",function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else {
		res.render("campgrounds/index",{campgrounds:allCampgrounds});
		}
	});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name:name, image:image, description:desc}
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);	
		} else{
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new.ejs")
});

//SHOW- SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req,res){
	Campground.findById(req.params.id).populate("comments").exec (function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
		//render show template with the 		campground
		res.render("campgrounds/show",{campground:foundCampground});
		}
	});
	
	
})

// ===========================
		//COMMENT ROUTES
// ===========================
app.get("/campgrounds/:id/comments/new", function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {campground: campground});
        }
    })
});

// app.post("/campgrounds/:id/comments", function(req, res){
// 	Campground.findById(req.params.id, function(err, campground){
// 		if (err){
// 			console.log(err);
// 			 res.redirect("/campgrounds");
// 		}else{
// 			Comment.create( req.body.comment, function(err, comment){
// 				if(err){
// 					console.log(err);
// 				} else{
// 					campground.comments.push(comment);
// 					campground.save();
// 					res.redirect('/campgrounds/' + campground._id);
// 					console.log(comment);
// 				}
				
// 			});
			
// 		}
// 	});
// });

app.post("/campgrounds/:id/comments", function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
		   console.log(req.body.comment);
        Comment.create( req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               campground.comments.push(comment);
               campground.save();
               res.redirect('/campgrounds/' + campground._id);
           }
        });
       }
   });
   });
app.listen(3000, function(){
	console.log("Yelp Camp server has started");
});
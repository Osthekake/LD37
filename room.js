let Room = {};

//level definitions
Room.rooms = {
	"livingroom" : {
		id: "livingroom",
		doors : ["west"],
		windows : ["north"],
		background: "url(img/livingroom.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 180, left: 100, width:100, height:100, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "The TV makes an annoying static noise."
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 290, left: 50, width:200, height:200, rotate:180
				},
				background: "url(img/shittysofa.png)",
				description: "This is an ugly, but comfortable sofa."
			},
			"#Bookshelf" :{ 
				name: "Bookshelf",
				cssBounds: {
					top: 100, left: 300, width:200, height:200, rotate:90
				},
				background: "url(img/bookshelf.png)",
				description: "The bookshelf is heavy to move around."
			}
		},
		badnesses: {
			'Sofa is not facing the windows' : function(room){
				console.log(Game.context.currentRoom.furniture["#Sofa"].facing);
				if(Game.context.currentRoom.furniture["#Sofa"].facing == "north")
					return 0;
				else
					return 1.0; //number for badness
			},	
			'Sofa is too close to a wall' : function(room){
				let sofa = room.furniture["#Sofa"];
				let distances = [sofa.distance.north, sofa.distance.south, sofa.distance.west, sofa.distance.east];
				let minDistance = Math.min.apply(Math, distances);
				console.log(distances);
				if(minDistance < 10)
					return 1;
				else return 0;
			},
			'Sofa is too far away from a wall' : function(room){
				let sofa = room.furniture["#Sofa"];
				let distances = [sofa.distance.north, sofa.distance.south, sofa.distance.west, sofa.distance.east];
				let minDistance = Math.min.apply(Math, distances);
				console.log(distances);
				if(minDistance > 50)
					return 1;
				else return 0;
			}
		},
		wintest : function(context){
			if(context.badness >= 1){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness == 2;
		}
	},
	"bedroom" : {
		id: "bedroom",
		doors : ["west"],
		windows : ["north", "east"],
		background: "url(img/bedroom.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 50, left: 50, width:140, height:70, rotate:0
				},
				background: "url(img/shittysofa.png)",
				description: "Sofa is comfy"
			}
		},
		badnesses: {
			'Room is unbalanced' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is not facing door' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is pink' : function(room){
				//todo:
				return 0.0; //number for badness
			},
			'Sofa is too close to a wall' : function(room){
				//todo:
				return 1.0; //number for badness
			},
			'Sofa is too far away from a wall' : function(room){
				let sofa = room.furniture["#Sofa"];
				//todo:
				return sofa.cssBounds.top / 180; //number for badness
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness > 4;
		}
	},
	"cozy" : {
		id: "cozy",
		doors : ["west"],
		windows : ["north", "east"],
		background: "url(img/livingroom.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 50, left: 50, width:140, height:70, rotate:0
				},
				background: "url(img/shittysofa.png)",
				description: "Sofa is comfy"
			}
		},
		badnesses: {
			'Room is unbalanced' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is not facing door' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is pink' : function(room){
				//todo:
				return 0.0; //number for badness
			},
			'Sofa is too close to a wall' : function(room){
				//todo:
				return 1.0; //number for badness
			},
			'Sofa is too far away from a wall' : function(room){
				let sofa = room.furniture["#Sofa"];
				//todo:
				return sofa.cssBounds.top / 180; //number for badness
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness > 4;
		}
	},
	"prison" : {
		id: "prison",
		doors : ["west"],
		windows : ["north", "east"],
		background: "url(img/prisoncell.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 50, left: 50, width:140, height:70, rotate:0
				},
				background: "url(img/shittysofa.png)",
				description: "Sofa is comfy"
			}
		},
		badnesses: {
			'Room is unbalanced' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is not facing door' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is pink' : function(room){
				//todo:
				return 0.0; //number for badness
			},
			'Sofa is too close to a wall' : function(room){
				//todo:
				return 1.0; //number for badness
			},
			'Sofa is too far away from a wall' : function(room){
				let sofa = room.furniture["#Sofa"];
				//todo:
				return sofa.cssBounds.top / 180; //number for badness
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness > 4;
		}
	},
	"beach" : {
		id: "beach",
		doors : ["west"],
		windows : ["north", "east"],
		background: "url(img/beach.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 50, left: 50, width:140, height:70, rotate:0
				},
				background: "url(img/shittysofa.png)",
				description: "Sofa is comfy"
			}
		},
		badnesses: {
			'Room is unbalanced' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is not facing door' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'Sofa is pink' : function(room){
				//todo:
				return 0.0; //number for badness
			},
			'Sofa is too close to a wall' : function(room){
				//todo:
				return 1.0; //number for badness
			},
			'Sofa is too far away from a wall' : function(room){
				let sofa = room.furniture["#Sofa"];
				//todo:
				return sofa.cssBounds.top / 180; //number for badness
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness > 4;
		}
	}
};

Room.isCrappy = function(room){
	return true;	
};
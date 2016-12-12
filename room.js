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
			},
			"#Lamp" :{ 
				name: "Lamp",
				cssBounds: {
					top: 300, left: 400, width:100, height:100, rotate:90
				},
				background: "url(img/lamp.png)",
				description: "The lamp glows brightly."
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
			},
			'Bookshelf is facing a wall' : function(room){
				return 0;
			},
			'Lamp is in a corner' : function(room){
				return 0;
			},
			'Sunlight from the windows hits the tv screen' : function(room){
				return 0;
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
		energyThreshold: 3,
		furniture : {
			"#Bed": { 
				name: "Bed",
				cssBounds: {
					top: 150, left: 250, width:200, height:200, rotate:90
				},
				background: "url(img/bed.png)",
				description: "The bed looks inviting and comfortable."
			},
			"#Wardrobe" :{ 
				name: "Wardrobe",
				cssBounds: {
					top: 10, left: 10, width:250, height:250, rotate:0
				},
				background: "url(img/wardrobe.png)",
				description: "The wardrobe heavy to move around."
			},
			"#Bedstand" :{ 
				name: "Bedstand",
				cssBounds: {
					top: 50, left: 350, width:100, height:100, rotate:90
				},
				background: "url(img/bedsidetable.png)",
				description: "A cute little table to have next to the bed."
			}
		},
		badnesses: {
			'Bed is near center of room' : function(room){
                let bed = room.furniture["#Bed"];
                let distances = [bed.distance.north, bed.distance.south, bed.distance.west, bed.distance.east];
                let minDistance = Math.min.apply(Math, distances);
                if (minDistance > 50)
                    return 1;
				return 0; //number for badness
			},	
			'Wardrobe is blocking the door' : function(room){
                let wardrobe = room.furniture["#Wardrobe"];
                let distances = [wardrobe.distance.west];
                let minDistance = Math.min.apply(Math, distances);
                if (minDistance < 10)
                    return 1;
				return 0; //number for badness
			},	
			'Wardrobe is blocking the window' : function(room){
                let wardrobe = room.furniture["#Wardrobe"];
                let distances = [wardrobe.distance.north, wardrobe.distance.east];
                let minDistance = Math.min.apply(Math, distances);
                if (minDistance < 10)
                    return 1;
				return 0; //number for badness
			},	
			'Bed far from window' : function(room){
                let bed = room.furniture["#Bed"];
                let distances = [bed.distance.north, bed.distance.east];
                let minDistance = Math.min.apply(Math, distances);
                if (minDistance > 50)
                    return 1;
				return 0; //number for badness
			},
			'Bedstand is far from bed' : function(room){
                let bedstand = room.furniture["#Bedstand"];
                let bed = room.furniture["#Bed"];
                let distance = Furniture.distanceBetween(bedstand, bed);
                if (distance > 100)
    				return 1.0; //number for badness
                return 0;
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shaking');
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
		energyThreshold: 2,
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
			},
			"#Lamp" :{ 
				name: "Lamp",
				cssBounds: {
					top: 300, left: 400, width:100, height:100, rotate:90
				},
				background: "url(img/lamp.png)",
				description: "The lamp glows brightly."
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
			},
			'Bookshelf is facing a wall' : function(room){
				return 0;
			},
			'Lamp is in a corner' : function(room){
				return 0;
			},
			'Sunlight from the windows hits the tv screen' : function(room){
				return 0;
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shaking');
			}else if(context.badness > 1){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness <= 0;
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
			'Sofa is not facing door' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'TV is not facing sofa' : function(room){
				//todo:
				return 0.0; //number for badness
			},
			'Bed is too far from a wall' : function(room){
				//todo:
				return 1.0; //number for badness
			},
			'Bookshelf is blocking door' : function(room){
				//todo:
				return 0;
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
			'TV is in the water' : function(room){
				//todo:
				return 1.0; //number for badness
			},	
			'You have been pushing furniture around all night.' : function(room){
				//todo: (timer?)
				return 1.0; //number for badness
			},	
			'Sofa is facing away from TV' : function(room){
				//todo:
				return 0.0; //number for badness
			},
			'Sofa is in the water' : function(room){
				//todo:
				return 1.0; //number for badness
			},
			'You can hear voices in your head' : function(room){
				//todo: (something weird?)
				return 0; //number for badness
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

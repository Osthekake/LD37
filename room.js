let Room = {};

//level definitions
Room.rooms = {
	"livingroom" : {
		id: "livingroom",
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
				let bookshelf = room.furniture["#Bookshelf"];
				if(bookshelf.facing == "north" && bookshelf.distance.north < 20){
					return 1;
				}else if(bookshelf.facing == "south" && bookshelf.distance.south < 20){
					return 1;
				}else if(bookshelf.facing == "east" && bookshelf.distance.east < 20){
					return 1;
				}else if(bookshelf.facing == "west" && bookshelf.distance.west < 20){
					return 1;
				}else return 0;
			},
			'TV is not facing sofa' : function(room){
				let tv = room.furniture["#TV"];
				let sofa = room.furniture["#Sofa"];
				if(tv.facing == "north" && sofa.facing == "south") return 0;
				if(tv.facing == "south" && sofa.facing == "north") return 0;
				if(tv.facing == "east" && sofa.facing == "west") return 0;
				if(tv.facing == "west" && sofa.facing == "east") return 0;
				return 1;
			},
			'Sunlight from the windows hits the tv screen' : function(room){
				let tv = room.furniture["#TV"];
				if(tv.facing == "north") return 1;
				else return 0;
			}
		},
		wintest : function(context){
			if(context.badness >= 2){
				$(".room").css('animation-name', 'shakingless');
			}
			//some test for winning here
			return context.badness == 3;
		}
	},
	"bedroom" : {
		id: "bedroom",
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
                if (minDistance > 150)
                    return 1;
				return 0; //number for badness
			},	
			'Wardrobe is blocking the door' : function(room){
                let wardrobe = room.furniture["#Wardrobe"];
                if (wardrobe.distance.west < 10 && wardrobe.distance.north > 90 && wardrobe.distance.south > 90 )
                    return 1;
				return 0; //number for badness
			},	
			'Wardrobe is blocking the window' : function(room){
				let wardrobe = room.furniture["#Wardrobe"];
                if (wardrobe.distance.east < 10 && wardrobe.distance.north > 90 && wardrobe.distance.south > 90 )
                    return 2;
				return 0; //number for badness
			},	
			'Bed far from window' : function(room){
                let bed = room.furniture["#Bed"];
                if (bed.distance.east > 250)
                    return 1;
				return 0; //number for badness
			},
			'Bedstand is far from bed' : function(room){
                let bedstand = room.furniture["#Bedstand"];
                let bed = room.furniture["#Bed"];
                let distance = Furniture.distanceBetween(bedstand, bed);
                console.log(distance);	
                if (distance > 200)
    				return distance / 200; //number for badness
                return 0;
			},
			'Bad energy is focused into bed' : function(room){
                let bed = room.furniture["#Bed"];
				let focus = Game.context.energyVector;
				if(focus && bed.cssBounds.top - focus.y < 100 && bed.cssBounds.left - focus.x < 100){
					return 2;
				}else return 0;
			}
		},
		wintest : function(context){
			if(context.badness > 3){
				$(".room").css('animation-name', 'shaking');
			}
			let bed = context.currentRoom.furniture["#Bed"];
			let focus = context.energyVector;
			return context.badness > 4  && (bed.cssBounds.top - focus.y) < 100 && (bed.cssBounds.left - focus.x) < 100;
		}
	},
	"cozy" : {
		id: "cozy",
		background: "url(img/livingroom.png)",
		energyThreshold: 10,
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 180, left: 100, width:100, height:100, rotate:180
				},
				background: "url(img/shittytv.png)",
				description: "The TV makes an annoying static noise."
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 0, left: 50, width:200, height:200, rotate:0
				},
				background: "url(img/shittysofa.png)",
				description: "This is an ugly, but comfortable sofa."
			},
			"#Table" :{ 
				name: "Table",
				cssBounds: {
					top: 300, left: 300, width:200, height:200, rotate:0
				},
				background: "url(img/table.png)",
				description: "This stupid table always gets in the way."
			},
			"#Bookshelf" :{ 
				name: "Bookshelf",
				cssBounds: {
					top: 100, left: 300, width:200, height:200, rotate:270
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
				let bookshelf = room.furniture["#Bookshelf"];
				if(bookshelf.facing == "north" && bookshelf.distance.north < 20){
					return 1;
				}else if(bookshelf.facing == "south" && bookshelf.distance.south < 20){
					return 1;
				}else if(bookshelf.facing == "east" && bookshelf.distance.east < 20){
					return 1;
				}else if(bookshelf.facing == "west" && bookshelf.distance.west < 20){
					return 1;
				}else return 0;
			},
			'TV is not facing sofa' : function(room){
				let tv = room.furniture["#TV"];
				let sofa = room.furniture["#Sofa"];
				if(tv.facing == "north" && sofa.facing == "south") return 0;
				if(tv.facing == "south" && sofa.facing == "north") return 0;
				if(tv.facing == "east" && sofa.facing == "west") return 0;
				if(tv.facing == "west" && sofa.facing == "east") return 0;
				return 1;
			},
			'Sunlight from the windows hits the tv screen' : function(room){
				let tv = room.furniture["#TV"];
				if(tv.facing == "north") return 1;
				else return 0;
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
		background: "url(img/prisoncell.png)",
		furniture : {
			"#Bed": { 
				name: "Bed",
				cssBounds: {
					top: 150, left: 250, width:200, height:200, rotate:90
				},
				background: "url(img/bed.png)",
				description: "The bed looks inviting and comfortable."
			},
			"#Bedstand" :{ 
				name: "Bedstand",
				cssBounds: {
					top: 50, left: 350, width:100, height:100, rotate:90
				},
				background: "url(img/bedsidetable.png)",
				description: "A cute little table to have next to the bed."
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 0, left: 50, width:200, height:200, rotate:0
				},
				background: "url(img/shittysofa.png)",
				description: "This is an ugly, but comfortable sofa."
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

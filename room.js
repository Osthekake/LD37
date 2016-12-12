let Room = {};

//level definitions
Room.rooms = {
	"livingroom" : {
		id: "livingroom",
		doors : ["west"],
		windows : ["north", "east"],
		background: "url(img/livingroom.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				cssBounds: {
					top: 150, left: 250, width:100, height:100, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				cssBounds: {
					top: 50, left: 50, width:200, height:200, rotate:0
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
	"bedroom" : {
		id: "bedroom",
		doors : ["west"],
		windows : ["north", "east"],
		background: "url(img/bedroom.png)",
		furniture : {
			"#TV": { 
				name: "TV",
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				boundingBox: [50, 50, 100, 200],
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
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				boundingBox: [50, 50, 100, 200],
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
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				boundingBox: [50, 50, 100, 200],
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
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 150, left: 250, width:50, height:50, rotate:0
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
			},
			"#Sofa" :{ 
				name: "Sofa",
				boundingBox: [50, 50, 100, 200],
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
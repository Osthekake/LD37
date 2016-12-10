let Game = {};

//level definitions
Game.rooms = {
	"start" : {
		id: "start",
		doors : ["west"],
		windows : ["north", "east"],
		furniture : {
			"#Sofa" :{ 
				name: "Sofa",
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 50, left: 50, width:140, height:70
				},
				background: "url(img/shittysofa.png)",
				description: "Sofa is comfy"
			}, 
			"#TV": { 
				name: "TV",
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 150, left: 250, width:50, height:50
				},
				background: "url(img/shittytv.png)",
				description: "TV is noisy"
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
				//todo:
				return 0.0; //number for badness
			}
		},
		wintest : function(){
			//some test for winning here
			return Room.isCrappy(Game.context.currentRoom);
		}
	}
};

//These items should be loaded into context from other places when we start. There should be no hardcoding in contex. for dev only. :)
Game.context = {
	unlockedRooms : ["start"],
	currentRoom: undefined, // current level
	badStuff: [],
	selectedFurniture: undefined //currently clicked furniture id
};

Game.renderTo = function(template_id, output){
	//console.log(template_id);
	if(!Templates[template_id]){
		var template = makeTemplate(template_id);
		if(!template)
			console.log("Could not compile template " + template_id);
		else
			Templates[template_id] = template;
	}
	var rendered = Templates[template_id](Game.context);
	if(output)
		output.html(rendered);
	return rendered;
};

Game.renderSelectedInfo = function(){
	if(Game.context.selectedFurniture){
		Game.context.selected = Game.context.currentRoom.furniture[Game.context.selectedFurniture];
		console.log("rendering info about " + Game.context.selectedFurniture);	
	}else{
		Game.context.selected = undefined;
	}
	Game.renderTo("#currentlySelected", $("#selectedTarget"));
}

Game.renderAll = function(){
	Game.calculateQi(Game.context.currentRoom);
	Game.renderTo("#gameHelp", $("#helpTarget"));
	Game.renderTo("#room", $("#roomTarget"));
	Game.renderSelectedInfo();
	Game.renderTo("#info", $("#infoTarget"));
};

Game.start = function(roomName){
	//setup
	//todo: load appropriate things into context from the given room.
	let theLevel = Game.rooms[roomName];
	console.log("loading level");
	console.log(theLevel);
	Game.context.currentRoom = JSON.parse(JSON.stringify(theLevel)); //only way I know to reliably make a copy
	Game.renderAll();
	
};

Game.mouseMove = function(event) {
	if(Game.context.selectedFurniture){
		let id = Game.context.selectedFurniture;
 		let el = $(id);
		el.css({
		    left: event.pageX, //todo: keep it on the mouse where it was picked up
		    top: event.pageY
		});
		//console.log(event.pageX + ", " + event.pageY);
		//Game.renderTo("#room", $("#roomTarget"));
	}
}

Game.pickUpFurniture = function(furniture, event){
	if(!Game.context.selectedFurniture){
		console.log("picked up " + furniture.id);
		Game.context.selectedFurniture = "#" + furniture.id;
		//Game.renderAll();
		//show info about the slected thing
		Game.renderSelectedInfo();

		//enable clicking on room
		console.log("enabling clicking on room.");
		$("#roomTarget").bind("click", Game.placeFurniture)
		$("#roomTarget").bind("mousemove", Game.mouseMove);
	}
	event.stopPropagation();
	return false;
};

Game.placeFurniture = function(event){
	if(Game.context.selectedFurniture){
		console.log("placeFurniture")
		event.stopPropagation();
		let id = Game.context.selectedFurniture;
		console.log("placed " + id);
 		let el = $(id);
 		//todo: update data for templates
 		//check if furniture can be placed here
		if(true){
			Game.context.selectedFurniture = undefined;
			//disable clicking on room
			console.log("disabling clicking on room.");
			$("#roomTarget").unbind("click");
			$("#roomTarget").unbind("mousemove");

			//update context
			let updatedFurniture = Game.context.currentRoom.furniture[id];
			console.log(id);
			console.log(Game.context.currentRoom.furniture);
			updatedFurniture.cssBounds.top = event.pageY;
			updatedFurniture.cssBounds.left = event.pageX;
	 		Game.renderAll();
		}
	}
	return true;
};


Game.calculateQi = function(room){
	//todo: base these on calculations
	var totalBadness = 0;
	var badStuffs = [];
	let badnesses = Game.rooms[room.id].badnesses;
	for (var desc in badnesses){
		let test = badnesses[desc];
		let testResult = test(room);
		totalBadness += testResult;
		console.log("Test result for " + desc + " was " + testResult);
		if(testResult){
			badStuffs.push(desc + " (" + testResult + " negative qi)");
		}
	}
	Game.context.badStuff = badStuffs;
};

Game.win = function(){
	console.log("won");
	
};

Game.start("start");
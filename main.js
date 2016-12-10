let Game = {};

Game.rooms = {
	"start" : {
		furniture : [
			{ 
				name: "sofa",
				boundingBox: [50, 50, 100, 200],
			}
		],
		wintest : function(){
			//some test for winning here
			return Room.isCrappy(Game.context.currentRoom);
		}
	}
};

//These items should be loaded into context from other places when we start. There should be no hardcoding in contex. for dev only. :)
Game.context = {
	unlockedRooms : ["start"],
	currentRoom: {
		furniture : {
			"#sofa" :{ 
				name: "sofa",
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 50, left: 50, width:50, height:150
				},
				background: "yellow"
			}, 
			"#tv": { 
				name: "tv",
				boundingBox: [50, 50, 100, 200],
				cssBounds: {
					top: 150, left: 250, width:50, height:50
				},
				background: "blue"
			}
		}
	},
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

Game.renderAll = function(){
	Game.renderTo("#gameHelp", $("#helpTarget"));
	Game.renderTo("#room", $("#roomTarget"));
	Game.renderTo("#currentlySelected", $("#selectedTarget"));
	Game.renderTo("#info", $("#infoTarget"));
};

Game.start = function(roomName){
	//setup
	//todo: load appropriate things into context from the given room.
	Game.renderAll();
	
};

Game.mouseMove = function(event) {
	if(Game.context.selectedFurniture){
		let id = Game.context.selectedFurniture;
 		let el = $(id);
		el.css({
		    left: event.pageX + 20, //todo: keep it on the mouse where it was picked up
		    top: event.pageY + 20
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
			updatedFurniture.cssBounds.top = event.pageY;
			updatedFurniture.cssBounds.left = event.pageX;
	 		Game.renderAll();
		}
	}
	return true;
};


Game.calculateQi = function(room){
	
};

Game.win = function(){
	console.log("won");
	
};

Game.start();
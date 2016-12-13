let Game = {};

//These items should be loaded into context from other places when we start. There should be no hardcoding in contex. for dev only. :)
Game.context = {
	chapter: 0, //which chapter we are currently in.
	currentRoom: undefined, // current level
	badStuff: [], //the bad things in effect
	badness: 0, //current level of badness
	selectedFurniture: undefined, //currently clicked furniture id
    selectedCoordinates: [0, 0],
    selectedRotation: 0
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
	let story = Story[Game.context.chapter];
	//console.log(story);
	Game.context.story = story;
	//console.log(story.room)
	let theLevel = Room.rooms[story.room];
	console.log("loading level");
	console.log(theLevel);
	Game.context.currentRoom = JSON.parse(JSON.stringify(theLevel)); //only way I know to reliably make a copy
	
	Game.renderAll();
	Game.showIntro();
};

Game.mouseMove = function(event) {
	if(Game.context.selectedFurniture){
		let id = Game.context.selectedFurniture;
        let rom = $("#roomTarget").offset();
 		let el = $(id);
        let rotation = Game.context.selectedRotation;
		el.css({
		    left: event.pageX - rom.left - Game.context.selectedCoordinates[0],
		    top: event.pageY - rom.top - Game.context.selectedCoordinates[1],
//		    "transform": "rotate("+rotation+"deg)",
		});
		//console.log(event.pageX + ", " + event.pageY);
		//Game.renderTo("#room", $("#roomTarget"));
	}
};

Game.keypress = function(event){
	if(Game.context.selectedFurniture){
		if(event.which == 68){
			console.log("rotating clockwise");
			Game.context.selectedRotation = Game.context.selectedRotation + 90;
		}else if(event.which == 65){
			console.log("rotating counter clockwise");
			Game.context.selectedRotation = Game.context.selectedRotation - 90;
		}else {
			return;
		}
		let id = Game.context.selectedFurniture;
        console.log(Game.context.selectedRotation);
        $(id).css({"transform": "rotate("+ Game.context.selectedRotation +"deg)"}); 
	}
};

Game.pickUpFurniture = function(furniture, event){
	if(!Game.context.selectedFurniture){
        let elp = $("#" + furniture.id).offset();
		console.log("picked up " + furniture.id + " clicked on: " + (event.pageX - elp.left) + 
            "x" + (event.pageY - elp.top));
		Game.context.selectedFurniture = "#" + furniture.id;
        Game.context.selectedRotation =  Game.context.currentRoom.furniture["#"+furniture.id].cssBounds.rotate;
        Game.context.selectedCoordinates = [event.pageX - elp.left, event.pageY - elp.top];
		//Game.renderAll();
		//show info about the slected thing
		Game.renderSelectedInfo();

		//enable clicking on room
		console.log("enabling clicking on room.");
        $("#" + furniture.id).bind("click", Game.placeFurniture);
		$("#roomTarget").bind("click", Game.placeFurniture);
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
		
 		let el = $(id);

 		//check if furniture can be placed here
 		let furnitureCopy = JSON.parse(JSON.stringify(Game.context.currentRoom.furniture[id]));
 		let rom = $("#roomTarget").offset();

 		let intersectsWith = []; 
 		let furnitures = Game.context.currentRoom.furniture;
		furnitureCopy.cssBounds.top = event.pageY - rom.top - Game.context.selectedCoordinates[1];
		furnitureCopy.cssBounds.left = event.pageX - rom.left - Game.context.selectedCoordinates[0];
		
 		for(var furnId in furnitures){
 			let f = furnitures[furnId];
 			if(furnId != id && Furniture.intersects(furnitureCopy, f)){
 				intersectsWith.push(furnId);
 				$(furnId).addClass("intheway");
 			}
 		}
 		Game.context.intersectsWith = intersectsWith;
 		
 		let insideRoom = true //todo: calculate
		if(intersectsWith.length == 0 && insideRoom){
			console.log("placed " + id);
			Game.context.selectedFurniture = undefined;
			let updatedFurniture = Game.context.currentRoom.furniture[id];
			//disable clicking on room
			console.log("disabling clicking on room.");
			$("#roomTarget").unbind("click");
			$("#roomTarget").unbind("mousemove");

			//update context
			updatedFurniture.cssBounds.top = event.pageY - rom.top - Game.context.selectedCoordinates[1];
			updatedFurniture.cssBounds.left = event.pageX - rom.left - Game.context.selectedCoordinates[0];
			updatedFurniture.cssBounds.rotate = Game.context.selectedRotation;
			Furniture.calculateStuff(updatedFurniture);
		
	 		Game.renderAll();
	 		Game.testForWin();
		}else{
			console.log("could not place " + id);
			console.log(intersectsWith);
			el.addClass("intheway");
			Game.renderSelectedInfo();
		}
	}
	return true;
};

Game.testForWin = function(){
	let id = Game.context.currentRoom.id;
	let winTest = Room.rooms[id].wintest;
	if(winTest(Game.context)){
		Game.win();
	}else{
		console.log("no win yet")
	}
}

Game.calculateQi = function(room){
	let energyVector = {x:0, y:0};

	for (var furnitureid in Game.context.currentRoom.furniture){
//		console.log("calculating stuff for " + furnitureid);
		let furniture = Game.context.currentRoom.furniture[furnitureid];
		Furniture.calculateStuff(furniture);
		if(furniture.facing == "north")
			energyVector.y -= 1;
		if(furniture.facing == "south")
			energyVector.y += 1;
		if(furniture.facing == "east")
			energyVector.y += 1;
		if(furniture.facing == "west")
			energyVector.y -= 1;
	}

	var totalBadness = 0;
	var badStuffs = [];
	let badnesses = Room.rooms[room.id].badnesses;
	for (var desc in badnesses){
		let test = badnesses[desc];
		let testResult = test(room);
		totalBadness += testResult;
		//console.log("Test result for " + desc + " was " + testResult);
		if(testResult){
			badStuffs.push(desc + " (" + testResult.toFixed(1) + " negative qi)");
		}
	}
	console.log("total badness is " + totalBadness);
	Game.context.badness = totalBadness;
	Game.context.badStuff = badStuffs;

	if(totalBadness >= Game.context.currentRoom.energyThreshold){
		console.log("Badness above energyThreshold");
		energyVector.x *= (totalBadness * 10);
		energyVector.x += 250
		energyVector.y *= (totalBadness * 10);
		energyVector.y += 250
		Game.context.energyVector = energyVector;
	}else{
		console.log("Badness below energyThreshold");
		Game.context.energyVector = undefined;
	}
};

Game.showIntro = function(){
	Game.context.storyText = Game.context.story.before;
	var $modal = $("#modal");
	Game.renderTo("#storyModal", $("#modal"));
	$modal.modal();
};

Game.showOutro = function(){
	Game.context.storyText = Game.context.story.after;
	var $modal = $("#modal");
	Game.renderTo("#storyModal", $("#modal"));
	$modal.modal();
};

Game.win = function(){
	console.log("won");
	Game.showOutro();
	$('#modal').on('hidden.bs.modal', function () {
		Game.nextChapter();
	});
};

Game.nextChapter = function(){
	$('#modal').off('hidden.bs.modal');
	Game.context.chapter += 1;
	Game.start(Game.context.chapter);
}

$(document).keydown(Game.keypress);

Game.start(0);

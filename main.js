let Game = {};

//level definitions
Game.rooms = {
	"start" : {
		id: "start",
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
			//some test for winning here
			return context.badness > 4;
		}
	}
};

//These items should be loaded into context from other places when we start. There should be no hardcoding in contex. for dev only. :)
Game.context = {
	unlockedRooms : ["start"],
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
	let theLevel = Game.rooms[roomName];
	console.log("loading level");
	console.log(theLevel);
	Game.context.currentRoom = JSON.parse(JSON.stringify(theLevel)); //only way I know to reliably make a copy
	Game.renderAll();
	
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
		    "transform": "rotate("+rotation+"deg)",
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
//        $(id).css({"transform": "rotate("+ Game.context.selectedRotation +"deg);"}); //why the fuck does this not work?
	}
};

Game.pickUpFurniture = function(furniture, event){
	if(!Game.context.selectedFurniture){
        let elp = $("#" + furniture.id).offset();
		console.log("picked up " + furniture.id + " clicked on: " + (event.pageX - elp.left) + 
            "x" + (event.pageY - elp.top));
		Game.context.selectedFurniture = "#" + furniture.id;
        Game.context.selectedCoordinates = [event.pageX - elp.left, event.pageY - elp.top];

        Game.context.selectedRotation =  Game.context.currentRoom.furniture["#"+furniture.id].cssBounds.rotate;
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
		console.log("placed " + id);
 		let el = $(id);
 		//todo: update data for templates
 		//check if furniture can be placed here
 		let intersectsWith = []; //todo: calculate
 		let insideRoom = true //todo: calculate
		if(intersectsWith.length == 0 && insideRoom){
			Game.context.selectedFurniture = undefined;
			//disable clicking on room
			console.log("disabling clicking on room.");
			$("#roomTarget").unbind("click");
			$("#roomTarget").unbind("mousemove");

			//update context
			let updatedFurniture = Game.context.currentRoom.furniture[id];
            let rom = $("#roomTarget").offset();
			console.log(id);
			//console.log(Game.context.currentRoom.furniture);
			updatedFurniture.cssBounds.top = event.pageY - rom.top - Game.context.selectedCoordinates[1];
			updatedFurniture.cssBounds.left = event.pageX - rom.left - Game.context.selectedCoordinates[0];
			updatedFurniture.cssBounds.rotate = Game.context.selectedRotation;
	 		Game.renderAll();
	 		Game.testForWin();
		}else{
			Game.context.intersectsWith = intersectsWith;
			Game.renderSelectedInfo();
		}
	}
	return true;
};

Game.testForWin = function(){
	let id = Game.context.currentRoom.id;
	let winTest = Game.rooms[id].wintest;
	if(winTest(Game.context)){
		Game.win();
	}else{
		console.log("no win yet")
	}
}

Game.calculateQi = function(room){
	//todo: base these on calculations
	var totalBadness = 0;
	var badStuffs = [];
	let badnesses = Game.rooms[room.id].badnesses;
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
};

Game.win = function(){
	console.log("won");
	alert("you won");
};

$(document).keydown(Game.keypress);

Game.start("start");

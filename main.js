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

Game.context = {
	unlockedRooms : ["start"],
	currentRoom: undefined,
	currentFurniture: {},
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
	Game.renderAll();
	
};

Game.pickUpFurniture = function(furniture_key){
	

	Game.renderAll();
};

Game.placeFurniture = function(furniture_key){
	

	Game.renderAll();
};


Game.calculateQi = function(room){
	
};

Game.win = function(){
	console.log("won");
	
};

Game.start();
let Furniture = {};

Furniture.intersects = function(furniture1, furniture2){
    const f1_x = furniture1.cssBounds.left;
    const f1_radius = furniture1.cssBounds.width/2;
    const f1_y = furniture1.cssBounds.top;
    
    const f2_x = furniture2.cssBounds.left;
    const f2_radius = furniture2.cssBounds.width/2;
    const f2_y = furniture2.cssBounds.top;
    
    const distance_x = f1_x - f2_x;
    const distance_y = f1_y - f2_y;
    const addedRadius = f1_radius + f2_radius;

    const pythDistance = Math.sqrt(distance_y * distance_y + distance_x * distance_x);

   // console.log("distance was " + pythDistance);

    return pythDistance < addedRadius;
};

Furniture.calculateStuff = function(furniture){
    furniture.distance = {};
    furniture.distance.north = furniture.cssBounds.top;
    furniture.distance.west = furniture.cssBounds.left;
    furniture.distance.east = 500 - furniture.cssBounds.left + furniture.cssBounds.width;
    furniture.distance.south = 500 - furniture.cssBounds.top + furniture.cssBounds.height;
    let r = ((furniture.cssBounds.rotate % 360) + 360) % 360;
    if(r == 0){
        furniture.facing = "south";
    } else if(r == 90){
        furniture.facing = "west";
    } if(r == 180){
        furniture.facing = "north";
    } if(r == 270){
        furniture.facing = "east";
    }
};

Furniture.flipBoundingBox = function(furniture1) {
    const x = furniture1.boundingBox[0];
    const dx = furniture1.boundingBox[1];
    const y = furniture1.boundingBox[2];
    const dy = furniture1.boundingBox[3];
    furniture1.boundingBox[0] = -dy/2+(x+dx/2);
    furniture1.boundingBox[1] = dy;
    furniture1.boundingBox[2] = -dx/2+(y+dy/2);
    furniture1.boundingBox[3] = dx;
};

Furniture.rotateClockwise = function(furniture1) {
    Furniture.flipBoundingBox(furniture1);
    furniture1.orientation += 90;
    if (furniture1.orientation === 360) furniture1.orientation = 0;
};

Furniture.rotateCounterClockwise = function(furniture1) {
    Furniture.flipBoundingBox(furniture1);
    furniture1.orientation -= 90;
    if (furniture1.orientation === -90) furniture1.orientation = 270;
};

Furniture.insideRoom = function(furniture1){
	return false;	
};

/*
$(document).ready(function() {
    f1 = {
        boundingBox: [0, 5, 0, 5]
    };
    f2 = {
        boundingBox: [6, 10, 6, 10]
    };
    console.log("TEST no intersection: " + Furniture.intersects(f1, f2));
    f1 = {
        boundingBox: [0, 5, 0, 5]
    };
    f2 = {
        boundingBox: [2, 10, 2, 10]
    };
    console.log("TEST intersection: " + Furniture.intersects(f1, f2));
    f1 = {
        boundingBox: [0, 5, 0, 5]
    };
    f2 = {
        boundingBox: [2, 1, 2, 1]
    };
    console.log("TEST b inside a: " + Furniture.intersects(f1, f2));
    f1 = {
        boundingBox: [1, 5, 1, 5]
    };
    f2 = {
        boundingBox: [0, 10, 0, 10]
    };
    console.log("TEST a inside b: " + Furniture.intersects(f1, f2));
    f1 = {
        boundingBox: [2, 2, 4, 4]
    };
    Furniture.rotateClockwise(f1);
    console.log("TEST rotate: " + f1.boundingBox);
});

*/
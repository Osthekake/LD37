let Furniture = {};

Furniture.intersects = function(furniture1, furniture2){
    const f1_x = furniture1.boundingBox[0];
    const f1_dx = furniture1.boundingBox[1];
    const f1_y = furniture1.boundingBox[2];
    const f1_dy = furniture1.boundingBox[3];
    const f2_x = furniture2.boundingBox[0];
    const f2_dx = furniture2.boundingBox[1];
    const f2_y = furniture2.boundingBox[2];
    const f2_dy = furniture2.boundingBox[3];
    function is_inside(x, dx, y, dy, px, py) {
        if (x <= px && (x + dx) >= px &&
            y <= py && (y + dy) >= py)
        return true;
    }
    // check if any of the furniture2 corners inside furniture1
    if (is_inside(f1_x, f1_dx, f1_y, f1_dy, f2_x, f2_y) ||
        is_inside(f1_x, f1_dx, f1_y, f1_dy, f2_x + f2_dx, f2_y) ||
        is_inside(f1_x, f1_dx, f1_y, f1_dy, f2_x, f2_y + f2_dy) ||
        is_inside(f1_x, f1_dx, f1_y, f1_dy, f2_x + f2_dx, f2_y + f2_dy)) return true;


    if (is_inside(f2_x, f2_dx, f2_y, f2_dy, f1_x, f1_y) ||
        is_inside(f2_x, f2_dx, f2_y, f2_dy, f1_x + f1_dx, f1_y) ||
        is_inside(f2_x, f2_dx, f2_y, f2_dy, f1_x, f1_y + f1_dy) ||
        is_inside(f2_x, f2_dx, f2_y, f2_dy, f1_x + f1_dx, f1_y + f1_dy)) return true;
	return false;	
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


let Furniture = {};

Furniture.intersects = function(furniture1, furniture2){
    var f1_x = furniture1.boundingBox[0];
    var f1_dx = furniture1.boundingBox[1];
    var f1_y = furniture1.boundingBox[2];
    var f1_dy = furniture1.boundingBox[3];
    var f2_x = furniture2.boundingBox[0];
    var f2_dx = furniture2.boundingBox[1];
    var f2_y = furniture2.boundingBox[2];
    var f2_dy = furniture2.boundingBox[3];
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
});


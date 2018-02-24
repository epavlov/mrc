// Constants
var NORTH = 1;
var EAST = 2;
var SOUTH = 3;
var WEST = 4;

module.exports = {
    'Grid': Grid,
    'Rover': Rover
};

function Grid(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.cells = [];
}

Grid.prototype.generateGrid = function () {
    var arrayOfCells = new Array(this.rows);

    // initialize two-dimantional array (array of arrays)
    for(i = 0; i < this.rows; i++) {
        arrayOfCells[i] = new Array(this.columns);
    }

    // fill out array with zero values, representing clear grid
    for (i = 0; i < this.rows; i++) {
        for (j = 0; j < this.columns; j++) {
            arrayOfCells[i][j] = 0;
        }
    }
    this.cells = arrayOfCells;
};

// When adding obstacle, replace '0' with '1' one the grid to indicate obstacle in the cell
Grid.prototype.addObstacle = function (coordinates) {
    this.cells[coordinates[0]][coordinates[1]] = 1;
};

function Rover(grid, locCoordinates, direction) {
    this.grid = grid;
    this.x = locCoordinates[0];
    this.y = locCoordinates[1];
    this.direction = direction
}

// Moving Rover
// moveDirection can be two values: +1 (to move forward) and -1 (to move backwards)
Rover.prototype.move = function(moveDirection) {
    switch (this.direction) {
        case NORTH:
            this.y = this.y + (1 * moveDirection);
            break;
        case SOUTH:
            this.y = this.y - (1 * moveDirection);
            break;
        case WEST:
            this.x = this.x - (1 * moveDirection);
            break;
        case EAST:
            this.x = this.x + (1 * moveDirection);
            break;
    }
};

// Turning rover
// turnDirection can be two values: +1 (to turn right) and -1 (to turn left)
Rover.prototype.turn = function(turnDirection) {
    // cycle thru directions 1..4
    if (this.direction == 4 && turnDirection == 1) { 
        this.direction = 1; 
    } else if (this.direction == 0 && turnDirection == -1) {
        this.direction = 4; 
    } else {
        this.direction = this.direction + (1 * turnDirection);
    }
};


// DEBUGGING CODE
var g = new Grid(2, 2);
g.generateGrid();
g.addObstacle([0,1]);

// Print out grid
g.cells.forEach(element => {
    element.forEach(e => {
        //console.log(e);
    });
});

var r = new Rover(g, [0, 0], EAST);

// initial rover position
console.log("X: " + r.x + " Y: " + r.y);

r.move(-1); // go backwards
r.move(1); // go forward

// position after moving
console.log("X: " + r.x + " Y: " + r.y);

//turn rover
console.log(r.direction);
r.turn(1);
console.log("New direction: " + r.direction);
r.turn(1);
console.log("New direction: " + r.direction);
r.turn(1);
console.log("New direction: " + r.direction);
r.turn(1);
console.log("New direction: " + r.direction);


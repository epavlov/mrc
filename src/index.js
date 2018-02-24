// Constants
var NORTH = 'N';
var SOUTH = 'S';
var WEST = 'W';
var EAST = 'E';

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

Rover.prototype.goForward = function() {
    switch (this.direction) {
        case NORTH:
            this.y = this.y + 1;
            break;
        case SOUTH:
            this.y = this.y - 1;
            break;
        case WEST:
            this.x = this.x - 1;
            break;
        case EAST:
            this.x = this.x + 1;
            break;
    }
};

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
console.log("X: " + r.x + " Y: " + r.y)
r.move(-1); // go backwards
r.move(1); // go forward

console.log("X: " + r.x + " Y: " + r.y)

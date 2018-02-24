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

// When adding obstacle, replace '0' with '1' on the grid to indicate obstacle in the cell
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
    var x = this.x;
    var y = this.y;

    switch (this.direction) {
        case NORTH:
            y = y + (1 * moveDirection);
            break;
        case SOUTH:
            y = y - (1 * moveDirection);
            break;
        case WEST:
            x = x - (1 * moveDirection);
            break;
        case EAST:
            x = x + (1 * moveDirection);
            break;
    }
    
    // Connect the grid and flip coordinates
    if (x == -1) {
        x = this.grid.rows - 1;
    }

    if (y == -1) {
        y = this.grid.columns - 1;
    }

    // New coordinates equired
    // Check for obsticles before moving
    if (this.obsticleScan([x, y])) {
        console.log("Obsticle detected!");
    } else {
        // No obsticle in the next grid cell, free to move
        this.x = x;
        this.y = y;
        console.log("Moved to: " + x + ", " + y);
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
    console.log("Turned");
};

// Check if next cell on a grid contains obsticle and return bool value
Rover.prototype.obsticleScan = function(coordinates) {
    if (this.grid.cells[coordinates[0]][coordinates[1]] == 1) {
        return true;
    } else {
        return false;
    }
}

Rover.prototype.performCommands = function(commands) {
    var arrayOfCommands = commands.split('');
    arrayOfCommands.forEach(command => {
        switch (command) {
            case 'f':
                this.move(1);
                break;
            case 'b':
                this.move(-1);
                break;
            case 'l':
                this.turn(-1);
                break;
            case 'r':
                this.turn(1);
                break;
            default:
                console.log('Undefined command detected!');
                break;
        }
    });
}


// EXAMPLE RUNNING CODE
// 5 by 5 grid with one obstacle
// Rover at 0, 0 facing EAST
var g = new Grid(5, 5);
g.generateGrid();
g.addObstacle([1, 0]);

var r = new Rover(g, [0, 0], EAST);

r.performCommands("flfrf");


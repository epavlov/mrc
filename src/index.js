module.exports = {
    'Grid': Grid
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
    console.log(arrayOfCells);
    this.cells = arrayOfCells;
};

Grid.prototype.addObstacle = function (coordinates) {
    this.cells[coordinates[0]][coordinates[1]] = 1;
};

function Rover(grid, locCoordinates) {
    this.grid = grid;
    this.x = locCoordinates[0];
    this.y = locCoordinates[1];
}

var g = new Grid(2, 2);
g.generateGrid();
g.addObstacle([0,1]);

g.cells.forEach(element => {
    element.forEach(e => {
        console.log(e);
    });
});

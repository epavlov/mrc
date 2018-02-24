# mars rover simulator

### To run:
```javascript
var grid = new Grid(5, 5);
grid.generateGrid();
grid.addObstacle([1, 0]);

var rover = new Rover(grid, [0, 0], EAST);

rover.performCommands("flfrf");
```

### Output:
```
Obsticle detected!
Turned
Moved to: 0, 1
Turned
Moved to: 1, 1
```
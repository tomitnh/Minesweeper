/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 *
 * 1) Create a grid/coordinate for the cells
 * 		a) process through the cells on click
 * 2) Rendering each cell
 * 3) Player lose when the cell clicked has a bee
 */

var fps = 15; // Standard frames per second
var intervalID = window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Register click listner
canvas.addEventListener('mousedown', mouseClick);

// Prevent right click contextmenu from showing up
canvas.addEventListener('contextmenu', function (e){
	event.preventDefault()
});
// Load bee's image
var loaded = false;
var numImgs = 2;
var beeImg = new Image();
beeImg.src = './Sprite/bee.png';
beeImg.onLoad = rscLoaded();

var flagImg = new Image();
flagImg.src = './Sprite/flag.png';
flagImg.onLoad = rscLoaded();

// Grid of the game board
// initialized with cols x rows of cells
// that may be used in processing through 
// neighboring cells when clicked.
var size = 10;
var cellSize = 40;  
var grid = [size];		// 2D array 10x10

for (var i = 0; i<size; i++) {
	grid[i] = [size];

	for (var j = 0; j<size; j++) {
		var p = new Point(j * cellSize, i * cellSize);
		grid[i][j] = new Cell(p,cellSize);
	}
}

// Calculate the number of bees neighboring
// each cell
for (var i = 0; i<size; i++) {
	for (var j = 0; j<size; j++) {
		var cell = grid[i][j];
		cell.neighborBees = cell.countNeighborBees();
	}
}

function mouseClick(e) {
	// console.log(e);
	var cell = getCell(e.x, e.y);

	if (e.button == 0) {
		// Left click
		cell.reveal();

		if (cell.bee) {
			gameOver();
		}
	}

	if (e.button == 2) {
		// Right click; 
		cell.flagged = !cell.flagged;
	}
}

function gameOver () {
	for (var i = 0; i<size; i++) {
		for (var j = 0; j<size; j++) {
			var cell = grid[i][j];
			cell.revealed = true;
		}
	}
}

function rscLoaded() {
	// https://codeincomplete.com/posts/javascript-game-foundations-loading-assets/
	numImgs -= 1;
	loaded = numImgs == 0;
}

// Derive the col and row of the cell based 
// on the x,y clicked coordinate
function getCell (x, y) {
	var i = Math.floor(y / cellSize);
	var j = Math.floor(x / cellSize);

	return grid[i][j];
}

function draw() {

	if (!loaded) {
		// do nothing and wait for img to load
		return;
	}
	ctx.fillStyle = 'grey';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i<size; i++) {
		for (var j = 0; j<size; j++) {
			grid[i][j].show();
		}
	}
}

function animate() {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}

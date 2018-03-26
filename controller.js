/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 *
 * 1) Create/spawn food 
 * 2) Create snake's tail
 * 3) Create losing condition. If the snake head touched its
 * 	body, the player lose. The game stopped running and the 
 *	snake becomes a Tan color
 */

var fps = 15; // Standard frames per second
var intervalID = window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function mouseClick(e) {
	// console.log(e);
	var cell = getCell(e.x, e.y);
	cell.reveal();
}
canvas.addEventListener('click', mouseClick);

var loaded = false;
var beeImg = new Image();
beeImg.src = './Sprite/bee.jpg';
beeImg.onLoad = rscLoaded();

function rscLoaded() {
	loaded = true;
}

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

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

// First figure of our tetris game
const figure_matrix = [
	[0, 0, 0],
	[0, 1, 0],
	[1, 1, 1]
];

// Object representation of our blocked figure
const figure = {
	pos: {x: 8, y: 8},
	matrix: figure_matrix,
}

// This method will 'clear' the screen by re-filling it with black color
// and drawing the figure_matrix on it's position all over again
function draw() {
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(figure.matrix, figure.pos);
}

// Draws the figure_matrix on it's position (offSet)
function drawMatrix(matrix, offSet) {
	matrix.forEach( (row, y) => {
		row.forEach( (value, x) => {
			if( value !== 0 ) {
				context.fillStyle = 'red';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
		});
	});
}

// We increment the 'y' property of our figure in order to make it move down 
function figureDrop() {
	figure.pos.y++;
	dropCounter = 0;
}

function update() {
	figureDrop();
}

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

let now;
let	dt = 0;
let	last = timestamp();
let step = 1
// We limit the 'frames' per second to update one time per second
function frame() {
	now = timestamp();
	dt = dt + Math.min(1, (now - last) / 1000);
	while ( dt > step ) {
		dt = dt - step;
		update(step);
	}
	draw(dt);
	last = now;
	
	requestAnimationFrame(frame);
}

// The call the update method (could be seen as our not-that-fancy game loop)
requestAnimationFrame(frame);

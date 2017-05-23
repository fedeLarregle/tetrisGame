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

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
// We limit the 'frames' per second to update one time per second
function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;
	dropCounter += deltaTime;
	// Check condition for dropping the figure only ones per second
	if ( dropCounter > dropInterval ) {
		figureDrop();
	}
	draw();
	requestAnimationFrame(update);
}
// The call the update method (could be seen as our not-that-fancy game loop)
update();

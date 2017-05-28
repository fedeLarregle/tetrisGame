const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);

function createMap(width, height) {
	const map = [];
	while ( height-- ) {
		map.push(new Array(width).fill(0));
	}
	return map;
}

const map = createMap(12, 20);

// This method will 'clear' the screen by re-filling it with black color
// and drawing the figure_matrix on it's position all over again
function draw() {
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(map, {x: 0, y: 0});
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

// Checks if we collide with a '1' in our map 'matrix'
function collide(map, figure, x, y) {
	const toX = x;
	const toY = y;
	const m = figure.matrix;
	const o = figure.pos;
	for (let y = 0; y < m.length; ++y) {
		for ( let x = 0; x < m[y].length; ++x ) {
			if ( (m[y][x] !== 0) && ( (map[y + o.y + toY]) && (map[y + o.y + toY][x + o.x + toX])) !== 0 ) {
				return true;
			}
		}
	}
	return false;
}

// Merges the map with the figures in it
function merge(map, figure) {
	figure.matrix.forEach( (row, y) => {
		row.forEach((value, x) => {
			if ( value !== 0 ) {
				map[y + figure.pos.y][x + figure.pos.x] = value;
			}
		});
	});
}

function update() {
	if ( collide(map, figure, 0, 1) ) {
		merge(map, figure);
		figure.pos.y = 0;
	} else {
		figureDrop();
	}
}

// The most similar way to do a 'System.currentTimeMillis()' 
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

// The call the requestAnimationFrame method (could be seen as our not-that-fancy game loop)
requestAnimationFrame(frame);

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const MAP_WIDTH = 12;
const MAP_HEIGHT = 20;
let pointsCounter = 0;
context.scale(20, 20);

function createMap(width, height) {
	const map = [];
	while ( height-- ) {
		map.push(new Array(width).fill(0));
	}
	return map;
}

const map = createMap(MAP_WIDTH, MAP_HEIGHT);

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
			if( value === 2 ) {
				context.fillStyle = 'rgba(204,54,60,0.8)';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
			if ( value === 3 ) {
				context.fillStyle = 'rgba(123,112,204,0.8)';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
			if ( value === 4 ) {
				context.fillStyle = 'rgba(97,204,94,0.8)';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
			if ( value === 5 ) {
				context.fillStyle = 'rgba(204,193,70,0.8)';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
			if ( value === 6 ) {
				context.fillStyle = 'rgba(66,204,55,0.8)';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
			if ( value === 7 ) {
				context.fillStyle = 'rgba(140,79,204,0.8)';
				context.fillRect(x + offSet.x, y + offSet.y, 1, 1);
			}
			if ( value === 8 ) {
				context.fillStyle = 'rgba(34,34,204,0.8)';
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
// We are using the number '2' to differenciate between blocks already merged and the ones that are part of the moving figure
function merge(map, figure) {
	figure.matrix.forEach( (row, y) => {
		row.forEach((value, x) => {
			if ( value !== 0 ) {
				map[y + figure.pos.y][x + figure.pos.x] = value;
			}
		});
	});
}

function rotate(figure) {
	for (let y = 0; y < figure.matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                figure.matrix[x][y],
                figure.matrix[y][x],
            ] = [
                figure.matrix[y][x],
                figure.matrix[x][y],
            ];
        }
    }

	figure.matrix.forEach(row => row.reverse());

}

// This method does a lot of things (probably need to separate this method in a few but we'll leave that for a later commit)
function checkRemovableLines(map) {
	let lineNumber = 0;
	let counter = 0;
	let mapCopy = [];
	// First we check each line in our map. If we find a '2' we increment a counter variable
	map.forEach( (line) => {
		
		line.forEach( (block) => {
			if ( block > 1 ) {
				counter++;
			}
		});
		// Second we check if our counter is 12 (the length of our map)
		if ( counter === 12 ) {
			let tempMap = map;
			// Third we remove all the blocks from that line by making them '0'
			for ( let i = 0; i < map[lineNumber].length; i++ ) {
				map[lineNumber][i] = 0;
			}
			// Fourth we make a copy of the map
			for ( let i = 0; i < map.length; i++ ) {
				mapCopy[i] = map[i];
			}
			// Fifth we move all lines above the one that we just removed one line down
			for ( let i = 0; i < lineNumber; i ++ ) {
				map[i + 1] = mapCopy[i];
			}
			pointsCounter += 100;
		}
		lineNumber++;
		counter = 0;
	});
}

function update() {
	if ( collide(map, figure, 0, 1) ) {
		merge(map, figure);
		figure.matrix = figures[chooseFigure()];
		figure.pos.x = 4;
		figure.pos.y = 0;
	} else {
		figureDrop();
	}
	checkRemovableLines(map);
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

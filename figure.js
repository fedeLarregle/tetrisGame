// First figure of our tetris game
const figures = [
[
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 0, 0]
],
[
	[0, 0, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 1, 0]
],
[
	[0, 0, 0, 0],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0]
],
[
	[0, 0, 0, 0],
	[0, 1, 1, 0],
	[0, 1, 0, 0],
	[0, 1, 0, 0]
],
[
	[0, 0, 0, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 0, 0]
],
[
	[0, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 0, 0]
],
[
	[0, 0, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[0, 0, 1, 0]
]
];

const figure = {
	pos: {x: 8, y: 8},
	matrix: figures[chooseFigure()],
};

// Choose a 'random' number between 0 and the length of figures array excluded
function chooseFigure() {
	return Math.floor(Math.random() * (figures.length));
}

// We increment the 'y' property of our figure in order to make it move down 
function figureDrop() {
	figure.pos.y++;
}

// We decrement the 'x' property of our figure in order to make it move to the left 
function figureLeft() {
	figure.pos.x--;
}

// We decrement the 'x' property of our figure in order to make it move to the right
function figureRight() {
	figure.pos.x++;
}

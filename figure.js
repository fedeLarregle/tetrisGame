// First figure of our tetris game
const figure_t = [
	[0, 0, 0],
	[0, 1, 0],
	[1, 1, 1]
];

const figure_i = [
	[1, 1, 1, 1],
];

const figure_o = [
	[1, 1],
	[1, 1]
];

const figure_j = [
	[0, 0, 0],
	[1, 0, 0],
	[1, 1, 1]
];

const figure_l = [
	[0, 0, 0],
	[1, 1, 1],
	[1, 0, 0]
];

const figure = {
	pos: {x: 8, y: 8},
	matrix: figure_t
};

// We increment the 'y' property of our figure in order to make it move down 
function figureDrop() {
	figure.pos.y++;
}

function figureLeft() {
	figure.pos.x--;
}

function figureRight() {
	figure.pos.x++;
}

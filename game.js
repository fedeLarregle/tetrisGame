const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

function draw() {
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

draw();

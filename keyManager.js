const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_LEFT = 37;

document.addEventListener('keydown', event => {
	if ( event.keyCode === KEY_UP ) {
		if ( (!collide(map, figure, -1, 0)) && (!collide(map, figure, 1, 0)) ) {
			rotate(figure);
		}
	}
	if ( event.keyCode === KEY_DOWN ) {
		if ( collide(map, figure, 0, 1) ) {
			merge(map, figure);
			figure.matrix = figures[chooseFigure()];
			figure.pos.x = 4;
			figure.pos.y = 0;
		} else {
			figureDrop();
		}
	}
	if ( event.keyCode === KEY_LEFT ) {
		if ( !collide(map, figure, -1, 0)) {
			figureLeft();
		}
	}
	if ( event.keyCode === KEY_RIGHT ) {
		if ( !collide(map, figure, 1, 0) ) {	
			figureRight();
		}
	}
});

const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;

document.addEventListener('keydown', event => {
	if ( event.keyCode === KEY_DOWN ) {
		if ( collide(map, figure, 0, 1) ) {
			merge(map, figure);
			figure.pos.y = 0;
		} else {
			figureDrop();
		}
	}
	if ( event.keyCode === KEY_LEFT ) {
		figureLeft();
	}
	if ( event.keyCode === KEY_RIGHT ) {
		figureRight();
	}
});

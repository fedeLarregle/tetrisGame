const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_LEFT = 37;

document.addEventListener('keydown', event => {
	if ( event.keyCode === KEY_DOWN ) {
		figureDrop();
	}
	if ( event.keyCode === KEY_LEFT ) {
		figureLeft();
	}
	if ( event.keyCode === KEY_RIGHT ) {
		figureRight();
	}
});

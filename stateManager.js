
const state_manager = {
	state: {
		initial: 'menu',
		events: [
			{name: 'start', from: 'menu', to: 'playing'},
			{name: 'play', from: 'playing' to: 'pause'},
			{name: 'play', from: 'playing' to: 'won'},
			{name: 'play', from: 'playing' to: 'lose'},
			{name: 'resume', from: 'pause', to: 'playing'}
		]
	}

};

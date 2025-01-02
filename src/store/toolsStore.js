import { writable } from 'svelte/store';

const toolsStore = writable({
	selectedState: {
		pencilSelected: false,
		eraserSelected: false,
		colorPickerSelected: false,
		shapePickerSelected: false
	},
	metadata: {
		selectedPencilColor: '#000000'
	}
});

export { toolsStore };

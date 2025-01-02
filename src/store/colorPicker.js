import { writable } from 'svelte/store';

const colorPickerStore = writable({
	selectedColor: '#000000',
	gradientX: 0,
	gradientY: 150
});

export { colorPickerStore };

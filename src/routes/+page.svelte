<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import PencilControl from '../components/Tools/Pencil.svelte';
	import { clickOutside } from '$lib/helpers';
	import Eraser from '../components/Tools/Eraser.svelte';
	import DrawingApp from '$lib/DrawingApp';
	import ColorPicker from '../components/Tools/ColorPicker.svelte';

	let drawingApp;

	onMount(() => {
		drawingApp = new DrawingApp('canvas');
	});
</script>

<div class="container">
	<div class="back-container">
		<button>
			<img src="/images/hamburger.svg" alt="" class="hamburger-icon" />
		</button>
	</div>

	<div class="controls-container shadow-md">
		<div>
			<div class="controls-button-container">
				<PencilControl {drawingApp} />
				<ColorPicker {drawingApp} />
				<Eraser {drawingApp} />

				<button class="control-button" on:click={() => drawingApp.undo()}>
					<img src="/images/undo-icon.svg" alt="" class="" />
				</button>
				<button class="control-button" on:click={() => drawingApp.redo()}>
					<img src="/images/redo-icon.svg" alt="" class="" />
				</button>

				<button class="control-button">
					<img src="/images/save-icon.svg" alt="" class="" />
				</button>
			</div>
		</div>
	</div>

	<canvas id="canvas"> This is a basic drawing board </canvas>
</div>

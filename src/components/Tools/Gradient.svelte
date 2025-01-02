<script>
	// @ts-nocheck
	import { clickOutside, rgbToHex } from '$lib/helpers';
	import { onMount } from 'svelte';
	import ColorPicker from '$lib/ColorPicker';
	import { writable } from 'svelte/store';
	import { colorPickerStore } from '../../store/colorPicker';

	export let drawingApp;

	$: selectedColor = $colorPickerStore.selectedColor;
	$: gradientX = $colorPickerStore.gradientX;
	$: gradientY = $colorPickerStore.gradientY;
	$: colorInput = selectedColor;

	let colorPicker;

	onMount(() => {
		colorPicker = new ColorPicker({
			gradientCanvasId: 'gradientCanvas',
			sliderCanvasId: 'hueSlider'
		});
	});
</script>

<div class="gradient-picker">
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="gradient-box"
		on:click={() => {
			colorPicker.handleGradientClick(event);
			drawingApp.updateLineColor($colorPickerStore.selectedColor);
		}}
		role="button"
	>
		<canvas id="gradientCanvas" width="250" height="150">hello</canvas>
		<div
			class="color-pointer"
			style="left: {gradientX}px; top: {gradientY}px; background-color: {selectedColor};"
		></div>
	</div>

	<div>
		<canvas
			class="hue-slider"
			id="hueSlider"
			width="250"
			height="25"
			on:click={() => colorPicker.handleHueClick()}
		></canvas>
	</div>

	<div class="color-preview">
		<div class="selected-color" style="background-color: {selectedColor};"></div>
		<input
			class="hex-input"
			type="text"
			placeholder="HEX"
			bind:value={colorInput}
			on:input={(e) => colorPicker.handleInput(colorInput)}
		/>
	</div>
</div>

<style>
	.gradient-picker {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 250px;
	}

	.gradient-box {
		position: relative;
		width: 100%;
		height: 150px;
		cursor: crosshair;
	}

	.color-preview {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.color-pointer {
		position: absolute;
		width: 8px;
		height: 8px;
		border: 2px solid #fff;
		border-radius: 50%;
		pointer-events: none;
		transform: translate(-50%, -50%);
	}

	.selected-color {
		width: 30px;
		height: 30px;
	}

	.hex-input {
		width: 216px;
		height: 27px;
		font-size: 14px;
		font-weight: 500;
		padding: 0px 10px;
		line-height: 100%;
	}
</style>

<script>
	// @ts-nocheck
	import { clickOutside } from '$lib/helpers';
	import Gradient from './Gradient.svelte';
	import { colorPickerStore } from '../../store/colorPicker';
	import { toolsStore } from '../../store/toolsStore';

	export let drawingApp;

	let isDropDownOpen = false;

	$: selectedColor = $colorPickerStore.selectedColor;

	const handleClickOutside = () => {
		isDropDownOpen = false;
	};
	const handleToggleControl = () => {
		drawingApp.selectColorPicker();
		isDropDownOpen = !isDropDownOpen;
	};
</script>

<div style="position: relative;" use:clickOutside on:click_outside={handleClickOutside}>
	<button
		class="control-button"
		aria-label="color-picker"
		on:click={handleToggleControl}
		class:selected-control={$toolsStore.selectedState.colorPickerSelected}
	>
		<span class="color-picker" style="background-color: {selectedColor};"></span>
	</button>

	{#if isDropDownOpen}
		<div class="controls-submenu-container shadow-md">
			<Gradient {drawingApp} />
		</div>
	{/if}
</div>

<script>
	// @ts-nocheck
	import { clickOutside } from '$lib/helpers';
	import { toolsStore } from '../../store/toolsStore';

	export let drawingApp;

	const lineWidths = ['2', '4', '8', '10', '12', '16'];
	let isDropDownOpen = false;

	const handleClickOutside = () => {
		isDropDownOpen = false;
	};
	const handleToggleControl = () => {
		drawingApp.selectEraser();
		isDropDownOpen = !isDropDownOpen;
	};
</script>

<div style="position: relative;" use:clickOutside on:click_outside={handleClickOutside}>
	<button
		class="control-button"
		on:click={handleToggleControl}
		class:selected-control={$toolsStore.selectedState.eraserSelected}
	>
		<img src="/images/eraser-icon.svg" alt="Eraser" />
	</button>

	{#if isDropDownOpen}
		<div class="controls-submenu-container shadow-md">
			<div class="eraser-controls-container">
				{#each lineWidths as item}
					<button
						class="width-btn"
						aria-label="line-width"
						on:click={() => drawingApp.changeEraserThickness(item)}
					>
						<div style="border-top: {item}px solid black;"></div>
					</button>
				{/each}
			</div>

			<div style="margin-top: 20px;">
				<button
					on:click={() => drawingApp.clearCanvas()}
					style="background-color: transparent; border: none; font-weight: 600; font-size: 14px"
				>
					Clear all
				</button>
			</div>
		</div>
	{/if}
</div>

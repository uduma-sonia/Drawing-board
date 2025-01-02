<script>
	// @ts-nocheck
	import { clickOutside } from '$lib/helpers';
	import { toolsStore } from '../../store/toolsStore';
	import { colorPickerStore } from '../../store/colorPicker';

	export let drawingApp;

	const lineWidths = ['1', '2', '3', '4', '6', '8', '10', '12'];
	let isDropDownOpen = false;

	const handleClickOutside = () => {
		isDropDownOpen = false;
	};

	const handleToggleControl = () => {
		drawingApp.selectPencil();
		isDropDownOpen = !isDropDownOpen;
	};
</script>

<div style="position: relative;" use:clickOutside on:click_outside={handleClickOutside}>
	<button
		class="control-button"
		on:click={handleToggleControl}
		class:selected-control={$toolsStore.selectedState.pencilSelected}
	>
		<img src="/images/pencil_dark.svg" alt="Pencil" />
	</button>

	{#if isDropDownOpen}
		<div class="controls-submenu-container shadow-md">
			<div class="pencil-controls-container">
				{#each lineWidths as item}
					<button
						class="width-btn"
						aria-label="line-width"
						on:click={() => drawingApp.changePencilWidth(item)}
					>
						<div style="border-top: {item}px solid black;"></div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

// @ts-nocheck
import { rgbToHex } from './helpers';
import { colorPickerStore } from '../store/colorPicker';

export default class ColorPicker {
	constructor({ gradientCanvasId, sliderCanvasId }) {
		this.gradientCanvas = document.getElementById(gradientCanvasId);
		this.sliderCanvas = document.getElementById(sliderCanvasId);

		this.gradientCtx = this?.gradientCanvas?.getContext('2d', { willReadFrequently: true });
		this.sliderCtx = this?.sliderCanvas?.getContext('2d', { willReadFrequently: true });

		this.gradientContext;
		this.sliderContext;
		this.gradientX;
		this.gradientY;

		this.selectedColor = '#000000';
		this.hue = 0;

		this.drawGradient();
		this.drawSlider();
	}

	drawGradient() {
		const width = this.gradientCanvas.width;
		const height = this.gradientCanvas.height;

		const baseColor = `hsl(${this.hue}, 100%, 50%)`;

		// Horizontal gradient (white to base color)
		const horizontalGradient = this.gradientCtx.createLinearGradient(0, 0, width, 0);
		horizontalGradient.addColorStop(0, 'white');
		horizontalGradient.addColorStop(1, baseColor);
		this.gradientCtx.fillStyle = horizontalGradient;
		this.gradientCtx.fillRect(0, 0, width, height);

		// Vertical gradient (transparent to black)
		const verticalGradient = this.gradientCtx.createLinearGradient(0, 0, 0, height);
		verticalGradient.addColorStop(0, 'rgba(0,0,0,0)');
		verticalGradient.addColorStop(1, 'rgba(0,0,0,1)');
		this.gradientCtx.fillStyle = verticalGradient;
		this.gradientCtx.fillRect(0, 0, width, height);

		this.gradientContext = this.gradientCtx;
	}

	drawSlider() {
		const ctx = this.sliderCanvas.getContext('2d');
		const width = this.sliderCanvas.width;
		const gradient = ctx.createLinearGradient(0, 0, width, 0);
		gradient.addColorStop(0, 'red');
		gradient.addColorStop(0.17, 'yellow');
		gradient.addColorStop(0.34, 'lime');
		gradient.addColorStop(0.51, 'cyan');
		gradient.addColorStop(0.68, 'blue');
		gradient.addColorStop(0.85, 'magenta');
		gradient.addColorStop(1, 'red');
		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, width, this.sliderCanvas.height);
		this.sliderContext = ctx;
	}

	updateStore() {
		colorPickerStore.update((payload) => {
			return {
				...payload,
				selectedColor: this.selectedColor,
				gradientX: this.gradientX,
				gradientY: this.gradientY
			};
		});
	}

	updateColorFromGradient(x, y) {
		const imageData = this.gradientContext.getImageData(x, y, 1, 1).data;
		this.selectedColor = rgbToHex(imageData[0], imageData[1], imageData[2]);
		this.updateStore();
	}

	handleGradientClick(event) {
		const rect = this.gradientCanvas.getBoundingClientRect();
		this.gradientX = event.clientX - rect.left;
		this.gradientY = event.clientY - rect.top;
		this.updateColorFromGradient(this.gradientX, this.gradientY);
	}

	handleHueClick() {
		const rect = this.sliderCanvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const width = this.sliderCanvas.width;
		this.hue = Math.round((x / width) * 360);
		this.drawGradient();
		this.updateColorFromGradient(this.gradientX, this.gradientY); // Update selected color based on new hue
	}

	handleInput(color) {
		this.selectedColor = color;
		this.updateStore();
	}
}

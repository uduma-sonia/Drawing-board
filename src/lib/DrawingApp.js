// @ts-nocheck

/**
 * @TODO Try using Points for the undo functionaliity
 */

import { toolsStore } from '../store/toolsStore';

export default class DrawingApp {
	/**
	 * @param {string} canvasId
	 */
	constructor(canvasId) {
		/**
		 * @type HTMLCanvasElement
		 */
		this.canvas = document.getElementById(canvasId);
		this.ctx = this?.canvas?.getContext('2d');

		this.ctxLineWidth = 4;
		this.ctxLineColor = '#000000';

		this.isDrawing = false;
		this.isErasing = false;

		this.pencilSelected = false;
		this.colorPickerSelected = false;
		this.eraserSelected = false;

		this.eraserThickness = 40;

		this.canvasStates = [];
		this.undoIndex = -1;

		this.initCanvas();
		this.attachEventListeners();
	}
	initCanvas() {
		this.canvas.style.width = '100%';
		this.canvas.style.height = '100%';
		this.canvas.width = this.canvas.offsetWidth;
		this.canvas.height = this.canvas.offsetHeight;

		this.saveCanvasState();
	}

	saveCanvasState() {
		const currentState = this.canvas.toDataURL();
		this.canvasStates = this.canvasStates.slice(0, this.undoIndex + 1);
		this.canvasStates.push(currentState);
		this.undoIndex = this.canvasStates.length - 1;
	}

	undo() {
		if (this.undoIndex > 0) {
			this.undoIndex--;
			this.restoreCanvasState(this.canvasStates[this.undoIndex]);
		}
	}

	redo() {
		if (this.undoIndex < this.canvasStates.length - 1) {
			this.undoIndex++;
			this.restoreCanvasState(this.canvasStates[this.undoIndex]);
		}
	}

	restoreCanvasState(state) {
		const img = new Image();
		img.onload = () => {
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.drawImage(img, 0, 0);
		};
		img.src = state;
	}

	selectPencil() {
		this.pencilSelected = true;
		this.eraserSelected = false;
		this.colorPickerSelected = false;

		toolsStore.update((payload) => {
			return {
				selectedState: {
					...payload.selectedState,
					pencilSelected: true,
					eraserSelected: false,
					colorPickerSelected: false
				}
			};
		});
	}

	selectEraser() {
		this.eraserSelected = true;
		this.pencilSelected = false;
		this.colorPickerSelected = false;

		toolsStore.update((payload) => {
			return {
				selectedState: {
					...payload.selectedState,
					eraserSelected: true,
					pencilSelected: false,
					colorPickerSelected: false
				}
			};
		});
	}

	selectColorPicker() {
		this.colorPickerSelected = true;
		this.eraserSelected = false;
		this.pencilSelected = false;

		toolsStore.update((payload) => {
			return {
				selectedState: {
					...payload.selectedState,
					colorPickerSelected: true,
					pencilSelected: false,
					eraserSelected: false
				}
			};
		});
	}

	changePencilWidth(width) {
		this.ctxLineWidth = width;
	}
	changeEraserThickness(thickness) {
		this.eraserThickness = thickness;
	}
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	updateLineColor(color) {
		this.ctxLineColor = color;
	}

	startPosition(e) {
		if (this.eraserSelected) {
			this.isErasing = true;
		}
		if (this.pencilSelected) {
			this.isDrawing = true;
		}

		this.handleMouseMove(e);
	}
	endPosition() {
		if (this.isDrawing || this.isErasing) {
			this.saveCanvasState();
		}

		this.isDrawing = false;
		this.isErasing = false;
		this.ctx.beginPath(); // Prevent connecting to the last point
	}

	handleDrawing(e) {
		this.ctx.lineWidth = this.ctxLineWidth;
		this.ctx.lineCap = 'round';
		this.ctx.strokeStyle = this.ctxLineColor;

		this.ctx.lineTo(e.clientX, e.clientY);
		this.ctx.stroke();
		this.ctx.beginPath();
		this.ctx.moveTo(e.clientX, e.clientY);
	}
	handleErasing(e) {
		this.ctx.globalCompositeOperation = 'destination-out'; // Set to erase mode
		this.ctx.beginPath();
		this.ctx.arc(e.offsetX, e.offsetY, this.eraserThickness / 2, 0, Math.PI * 2);
		this.ctx.fill();
		this.ctx.globalCompositeOperation = 'source-over'; // Reset to normal drawing mode
	}

	/**
	 * @param {MouseEvent} e
	 */
	handleMouseMove(e) {
		if (this.isDrawing) {
			this.handleDrawing(e);
		}
		if (this.isErasing) {
			this.handleErasing(e);
		}
	}

	attachEventListeners() {
		this.canvas.addEventListener('mousedown', (e) => this.startPosition(e));
		this.canvas.addEventListener('mouseup', () => this.endPosition());
		this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
	}
}

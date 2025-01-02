export const clickOutside = (/** @type {CustomEventInit<any> | undefined} */ node) => {
	const handleClick = (/** @type {{ target: any; defaultPrevented: any; }} */ event) => {
		// @ts-ignore
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			// @ts-ignore
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);
	document.addEventListener('mousedown', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export const rgbToHex = (/** @type {any} */ r, /** @type {any} */ g, /** @type {any} */ b) => {
	return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
};

export const hexToRgb = (/** @type {string} */ hex) => {
	const bigint = parseInt(hex.replace('#', ''), 16);
	return {
		r: (bigint >> 16) & 255,
		g: (bigint >> 8) & 255,
		b: bigint & 255
	};
};

// @ts-ignore
export const rgbToHsl = ({ r, g, b }) => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h, s, l;
	l = (max + min) / 2;
	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		// @ts-ignore
		h /= 6;
	}
	// @ts-ignore
	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

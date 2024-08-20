export function play(heaps: number[]) {
	const twoPlus = heaps.filter(heaps => heaps > 1).length;
	if (twoPlus > 1) {
		const xor = heaps.reduce((acc, heap) => acc ^ heap, 0);
		for (let i = 0; i < heaps.length; i++) {
			const newAmount = heaps[i] ^ xor;
			if (newAmount < heaps[i]) {
				return [i, heaps[i] - newAmount];
			}
		}
		const idx = Math.floor(Math.random() * heaps.length);
		return [idx, 1];
	} else if (twoPlus == 1) {
		const idx = heaps.findIndex(heap => heap > 1);
		return [idx, heaps[idx] - (heaps.length % 2)];
	} else {
		return [0, 1];
	}
}

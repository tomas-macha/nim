<script lang="ts">
	import Bg from "$lib/assets/bg.svg";
	import {Bot, User} from "lucide-svelte";
	import {createEventDispatcher} from "svelte";
	
	const maxHeaps = 8
	const presets = [
		[3, 4, 5],
		[8, 10, 13, 15],
		[1, 2, 3, 4, 5, 6, 7, 8]
	]
	
	let heaps: number[] = presets[1]
	let mode: "pp" | "bp" | "pb" = "pb"
	let heapPtr = 0
	
	const setMode = (m: "pp" | "bp" | "pb") => () => {
		mode = m
	}
	
	const customSelect = (n: number) => () => {
		heaps[heapPtr] = n
		heaps = heaps
		if (n == 0) {
			heaps = heaps.toSpliced(heapPtr, 1)
			if (heaps.length == 0) heaps = [1]
			heapPtr = Math.min(heapPtr, heaps.length - 1)
		} else {
			if (heapPtr == heaps.length - 1 && heaps.length < maxHeaps) {
				heaps = [...heaps, 0]
				heapPtr = heaps.length - 1
			} else {
				heapPtr = Math.min(heapPtr + 1, heaps.length - 1)
			}
		}
	}
	
	const setPtr = (i: number) => () => {
		heapPtr = i
		heaps = heaps.filter(h => h > 0)
		if (heaps.length == 0) heaps = [1]
	}
	
	const dispatch = createEventDispatcher()
	
	function play() {
		dispatch("play", {
			heaps: heaps.filter(h => h > 0),
			bot: mode != "pp",
			firstPlr: mode != "bp"
		})
	}
	

</script>

<div class="container" style:background-image="url({Bg})">
	<div class="inner">
		<div class="title">Layout</div>
		<div class="customLayout">
			<div class="selected">
				{#each heaps as h, i}
					<button class:active={heapPtr===i} on:click={setPtr(i)}>{h}</button>
				{/each}
				{#if heaps.length < maxHeaps}
					<button on:click={()=>{heaps = [...heaps, 1];heapPtr=heaps.length-1}}>+</button>
				{/if}
			</div>
			<div class="grid">
				{#each Array(25) as _, i}
					<button class="num" on:click={customSelect(i)} class:active={heaps[heapPtr]===i}>
						{i}
					</button>
				{/each}
			</div>
			<div class="presets">
				{#each presets as p}
					<button on:click={()=>{heaps = p;heapPtr=0}}>{p.join(" - ")}</button>
				{/each}
			</div>
		</div>
		<div class="title">Game mode</div>
		<div class="mode">
			<button class:active={mode==="pp"} on:click={setMode("pp")}>
				<span class="icon"><User size="3rem"/></span>
				<span class="icon"><User size="3rem"/></span>
				<span class="label">Two players</span>
			</button>
			<button class:active={mode==="pb"} on:click={setMode("pb")}>
				<span class="icon"><User size="3rem"/></span>
				<span class="icon"><Bot size="3rem"/></span>
				<span class="label">Player starts</span>
			</button>
			<button class:active={mode==="bp"} on:click={setMode("bp")}>
				<span class="icon"><Bot size="3rem"/></span>
				<span class="icon"><User size="3rem"/></span>
				<span class="label">Bot starts</span>
			</button>
		</div>
		<button class="play" on:click={play}>Play</button>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		padding: 2rem;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.inner {
		width: 100%;
		height: 100%;
		max-width: 40rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.title {
		font-size: 2rem;
		color: #EEE;
		text-transform: uppercase;
		margin: 2rem 0 .5rem;
	}
	
	.customLayout {
		width: 100%;
		max-width: 20rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	
	.selected {
		display: flex;
		gap: .5rem;
	}
	
	.selected button {
		width: 2rem;
		height: 2rem;
		background: transparent;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		color: #EEE;
		border-radius: 50%;
		border: 2px solid #EEE;
		transition: .2s;
	}
	
	.selected button.active {
		color: hsl(332, 50%, 80%);
		border-color: hsl(332, 50%, 80%);
	}
	
	.customLayout .grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(5, 1fr);
		max-width: 15rem;
		border: 1px solid #EEE;
	}
	
	.customLayout .num {
		cursor: pointer;
		width: 100%;
		aspect-ratio: 1;
		padding: .5rem;
		background: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1rem;
		color: #EEE;
		border: 1px solid #EEE;
		transition: .2s;
	}
	
	.customLayout .num.active {
		background: hsla(332, 50%, 70%, 30%);
	}
	
	.presets {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	
	.presets button {
		cursor: pointer;
		background: transparent;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: .5rem;
		border: 1px solid #EEE;
		color: #EEE;
		transition: .2s;
	}
	
	.mode {
		display: flex;
		gap: 1rem;
	}
	
	.mode button {
		cursor: pointer;
		background: transparent;
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: .5rem;
		gap: .5rem;
		transition: .2s;
		background: radial-gradient(closest-side, transparent, transparent);
	}
	
	.mode button:nth-child(1) {
		border: 4px solid hsl(152, 50%, 80%);
		color: hsl(152, 50%, 90%);
	}
	
	.mode button:nth-child(2) {
		border: 4px solid hsl(272, 50%, 80%);
		color: hsl(272, 50%, 90%);
	}
	
	.mode button:nth-child(3) {
		border: 4px solid hsl(32, 50%, 80%);
		color: hsl(32, 50%, 90%);
	}
	
	.mode button:not(.active) {
		filter: brightness(.7);
	}
	
	.mode button:hover {
		scale: 1.1;
	}
	
	.mode button .icon {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.mode button .label {
		display: flex;
		justify-content: center;
		align-items: center;
		grid-column: 1/3;
		font-size: 1rem;
	}
	
	.play {
		cursor: pointer;
		border: 4px solid hsl(332, 50%, 80%);
		color: hsl(332, 50%, 90%);
		padding: .5rem 1rem;
		background: transparent;
		margin-top: 2rem;
		font-size: 1rem;
		transition: .2s;
	}
	
	.play:hover {
		background: hsla(332, 50%, 70%, 30%);
	}
</style>
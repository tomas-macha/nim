<script lang="ts">
	import Aspect from "$lib/Aspect.svelte"
	import Circle from "$lib/Circle.svelte"
	import Stone from "$lib/assets/stone.svg"
	import Bg from "$lib/assets/bg.svg"
	import {play} from "$lib/bot"
	import {createEventDispatcher, onMount} from "svelte"
	import {Cog, HelpCircle, Home} from "lucide-svelte"
	
	export let options: { heaps: number[], bot: boolean, firstPlr: boolean }
	
	const bot = options.bot
	let heaps = options.heaps.map((h, i) => ({
		value: h,
		id: i
	}))
	let selected: { heap: number, amount: number } | null = null
	let firstPlr = options.firstPlr
	let winner: boolean = false
	
	const dispatch = createEventDispatcher()
	
	const increasingArray = (n: number) => Array.from({length: n}, (_, i) => i)
	
	const doesBotPlay = () => bot && !firstPlr
	
	const select = (heap: number, delta: number = 1) => () => {
		if (doesBotPlay()) return
		if (selected == null || selected.heap != heap) {
			if (delta == 1)
				selected = {heap, amount: 1}
			else
				selected = {heap, amount: heaps[heap].value}
		} else {
			console.log(selected.amount, delta)
			selected.amount += delta
			console.log(selected.amount, heaps[heap].value)
			if (selected.amount > heaps[heap].value) selected.amount = 1
			if (selected.amount < 1) selected.amount = heaps[heap].value
		}
	}
	
	function confirm() {
		if (!winner) {
			if (doesBotPlay()) return
			process()
		} else {
			heaps = options.heaps.map((h, i) => ({
				value: h,
				id: i
			}))
			winner = false
			selected = null
			firstPlr = options.firstPlr
			if (doesBotPlay()) botPlay()
		}
	}
	
	function process() {
		if (selected == null) return
		heaps[selected.heap].value -= selected.amount
		heaps = heaps.filter(h => h.value > 0)
		selected = null
		firstPlr = !firstPlr
		if (heaps.length == 0) win(firstPlr)
		else if (heaps.length == 1 && heaps[0].value == 1) win(!firstPlr)
		botPlay()
	}
	
	function win(first: boolean) {
		winner = true
		firstPlr = first
	}
	
	async function botPlay() {
		if (winner) return
		if (!doesBotPlay()) return
		const move = play(heaps.map(h => h.value))
		await new Promise(r => setTimeout(r, 500))
		selected = {heap: move[0], amount: move[1]}
		await new Promise(r => setTimeout(r, 500))
		process()
	}
	
	onMount(() => {
		if (doesBotPlay()) botPlay()
	})
	
	$: conicGradient = heaps.length == 0 ? "#eee" : `conic-gradient(${heaps.map(h => `hsl(${152 + h.id * 360 / options.heaps.length}, 50%, 70%)`).join(", ")}, hsl(${152 + heaps[0].id * 360 / options.heaps.length}, 50%, 70%))`
	$: if (document) document.documentElement.style.setProperty("--conic-gradient", conicGradient);

</script>

<svelte:head>
	<title>Nim game</title>
</svelte:head>

<div class="container" style:background-image="url({Bg})">
	<Aspect ratio={1}>
		<Circle let:item={i} items={heaps} size={"22%"}>
			<button class="heap item" on:click={select(i)} on:contextmenu|preventDefault={select(i, -1)}>
				<Circle let:item={j} items={increasingArray(heaps[i].value).map(i => ({id:i}))} size={"25%"}>
					<div class="stone item"
					     style:background-image="url({Stone})"
					     style:filter="hue-rotate({heaps[i].id*360/options.heaps.length}deg) {selected && selected.heap === i && selected.amount > j ? 'saturate(0) brightness(.5)' : ''}"
					></div>
					<div slot="center"
					     class="item stoneNum"
					     style:color="hsl({i*360/8+152}, 50%, 90%)"
					>
						{selected && selected.heap === i ? heaps[i].value - selected.amount : heaps[i].value}
					</div>
				</Circle>
			</button>
			<button slot="center" class="item center" on:click={confirm}>
				<span class="playing">
					{bot ? (
							firstPlr ? "Player" : "Bot"
					) : (
							firstPlr ? "Player 1" : "Player 2"
					)}
				</span>
				<span class="msg">
					{#if winner}
						is the winner.<br>
						Click to play again.
					{:else}
						{doesBotPlay() ? "Thinking..." : selected ? "Click to confirm" : "Select a heap"}
					{/if}
				</span>
			</button>
		</Circle>
	</Aspect>
	<button class="settingBtn" on:click={()=>dispatch("newGame")}>
		<Cog size="2rem"/>
	</button>
	<button class="homeBtn" on:click={()=>dispatch("home")}>
		<Home size="2rem"/>
	</button>
	<button class="helpBtn" on:click={()=>{window?.open("/help", '_blank')?.focus()}}>
		<HelpCircle size="2rem"/>
	</button>
</div>

<style>
	
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		padding: 2rem;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	.item {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: .2s;
	}
	
	button {
		cursor: pointer;
		border: none;
		background: transparent;
	}
	
	.heap {
		transition: .2s;
	}
	
	.heap:hover {
		scale: 1.1;
	}
	
	.stone {
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		transition: .2s;
	}
	
	.stoneNum {
		font-size: 2rem;
	}
	
	.center {
		flex-direction: column;
		border-radius: 50%;
		background-color: #111;
		color: #EEE;
		gap: .5rem;
	}
	
	.center:before, .center:after {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		border-radius: 50%;
		/*background: conic-gradient(
				hsl(152, 50%, 70%),
				hsl(192, 50%, 70%),
				hsl(232, 50%, 70%),
				hsl(272, 50%, 70%),
				hsl(312, 50%, 70%),
				hsl(352, 50%, 70%),
				hsl(32, 50%, 70%),
				hsl(72, 50%, 70%),
				hsl(112, 50%, 70%),
				hsl(152, 50%, 70%)
		);*/
		background: var(--conic-gradient);
		background-size: 100%;
		z-index: -1;
		transition: .2s;
	}
	
	.center:hover:before, .center:hover:after {
		filter: blur(24px);
	}
	
	.center:after {
		top: -8px;
		left: -8px;
		width: calc(100% + 16px);
		height: calc(100% + 16px);
		filter: blur(24px);
		opacity: 0.9;
	}
	
	.playing {
		font-size: 1.5rem;
	}
	
	.msg {
		font-size: .8rem;
		opacity: .8;
	}
	
	.homeBtn, .settingBtn, .helpBtn {
		position: absolute;
		bottom: 1rem;
		background: transparent;
		border: 2px solid #EEE;
		border-radius: 50%;
		width: 3rem;
		height: 3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		transition: .2s;
		color: #EEE;
	}
	
	.homeBtn {
		right: 5rem;
	}
	
	.settingBtn {
		right: 9rem;
	}
	
	.helpBtn {
		right: 1rem;
	}
</style>
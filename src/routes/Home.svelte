<script lang="ts">
	import Aspect from "$lib/Aspect.svelte"
	import Circle from "$lib/Circle.svelte"
	import Bg from "$lib/assets/bg.svg"
	import {HelpCircle, Play} from "lucide-svelte"
	import GitHubLogo from "$lib/assets/GitHubLogo.svelte"
	import {createEventDispatcher} from "svelte"
	
	const dispatch = createEventDispatcher()
</script>

<div class="container" style:background-image="url({Bg})">
	<Aspect ratio={1}>
		<Circle let:item={i} items={[1,2,3].map(i =>({id:i}))} size={"35%"}>
			<div class="item hover">
				{#if i === 0}
					<button class="big" on:click={()=>dispatch("newGame")}>
						<span class="icon"><Play size="3rem"/></span>
					</button>
				{:else if i === 1}
					<a href="https://github.com/tomas-macha/nim" target="_blank" class="big">
						<span class="icon"><GitHubLogo size="3rem"/></span>
					</a>
				{:else if i === 2}
					<a href="/help" class="big">
						<span class="icon"><HelpCircle size="3rem"/></span>
					</a>
				{/if}
			</div>
			<div slot="center" class="item center">
				NIM
			</div>
		</Circle>
	</Aspect>
</div>

<style>
	
	.container {
		width: 100%;
		height: 100%;
		padding: 2rem;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	
	button {
		cursor: pointer;
		border: none;
		background: transparent;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: .25rem;
		color: #EEE;
	}
	
	.item {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: .2s;
		border-radius: 50%;
		border: 2px solid #EEE;
		color: #EEE;
	}
	
	.hover:hover {
		scale: 1.1;
	}
	
	.center {
		flex-direction: column;
		border-radius: 50%;
		background-color: #111;
		color: #EEE;
		font-size: 3rem;
	}
	
	.center:before, .center:after {
		content: '';
		position: absolute;
		top: -2px;
		left: -2px;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		border-radius: 50%;
		background: #EEE;
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

	.big {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	a {
		color: #EEE;
	}

</style>
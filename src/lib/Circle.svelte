<script lang="ts">
	export let items: { id: number }[]
	export let offset: number = 0
	export let size: string
	
	$: positions = items.map((_, i) => {
		const ang = (i / items.length - 0.25 + offset) * Math.PI * 2
		return {
			x: Math.cos(ang),
			y: Math.sin(ang)
		}
	});
	
	let divSize: number
	
	
</script>

<div class="items" bind:clientWidth={divSize}>
	{#each items as item, i (item.id)}
		{@const pos = positions[i]}
		<div class="item"
		     style:translate="calc({pos.x} * ({divSize}px / 2 - 50%)) calc({pos.y} * ({divSize}px / 2 - 50%))"
		     style:width={size}
		     style:height={size}
		>
			<slot item={i}/>
		</div>
	{/each}
	<div class="item"
	     style:width={size}
	     style:height={size}
	>
		<slot name="center" />
	</div>
</div>


<style>
	
	.items {
		position: relative;
		width: 100%;
		height: 100%;
	}
	
	.item {
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: .2s;
	}
</style>
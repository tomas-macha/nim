<script lang="ts">
	export let ratio: number
</script>


<div class="container">
	<div class="w" style:aspect-ratio={ratio}>
		<div class="h" style:aspect-ratio={ratio}>
			<slot/>
		</div>
	</div>
</div>

<style>
	.container {
		height: 100%;
		width: 100%;
	}
	
	.w {
		width: 100%;
		max-height: 100%;
	}
	
	.h {
		height: 100%;
		max-width: 100%;
	}
	
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}

</style>
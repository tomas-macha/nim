<script lang="ts">
	import NewGame from "./NewGame.svelte";
	import Game from "./Game.svelte";
	import Home from "./Home.svelte";
	
	let page: "home" | "new" | "game" = "home";
	let gameOptions: { heaps: number[], bot: boolean, firstPlr: boolean } = {heaps: [], bot: false, firstPlr: false};
	
	
	function newGamePlay(data: { heaps: number[], bot: boolean, firstPlr: boolean }) {
		console.log(data)
		gameOptions = data;
		page = "game";
	}
	
	const pg = (p: "home" | "new" | "game") => () => page = p;

</script>

<svelte:head>
	<title>Nim game</title>
</svelte:head>

{#if page === "home"}
	<Home on:newGame={pg("new")}/>
{:else if page === "new"}
	<NewGame on:play={e => newGamePlay(e.detail)}/>
{:else if page === "game"}
	<Game options={gameOptions} on:home={pg("home")} on:newGame={pg("new")}/>
{/if}
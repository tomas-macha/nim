<script lang="ts">
	import Bg from "$lib/assets/bg.svg"
</script>

<div class="container" style:background-image="url({Bg})">
	<div class="content">
		<div class="title">Rules</div>
		<p>
			Nim is a mathematical game of strategy in which two players take turns removing objects from distinct heaps.
		</p>
		<ul>
			<li>Player must take one or more objects.</li>
			<li>Taken objects must be form the same heap.</li>
			<li>The player who takes the last object loses the game.</li>
			<li>Players take turns.</li>
		</ul>
		<div class="title">Controls</div>
		<ul>
			<li>Click on the heap as many times as you want to take objects from it.</li>
			<li>To take 3 objects, click 3 times on the heap.</li>
			<li>You can right click or long touch on the heap to put object back when you make a mistake.</li>
			<li>Right click can be used to take all objects as well.</li>
			<li>If you want to change the heap, just click on another.</li>
			<li>When you are done with removing objects, click on the button in the center to confirm.</li>
		</ul>
		<a href="/">Play the Nim game here!</a>
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
	
	.content {
		max-width: 80ch;
		width: 100%;
		color: #EEE;
	}
	
	.title {
		font-size: 2rem;
		margin: 1rem 0 0;
		color: #EEE;
	}
	
	a {
		color: hsl(152, 50%, 80%);
		text-decoration: underline;
	}
	
</style>
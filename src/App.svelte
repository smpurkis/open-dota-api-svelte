<script>
	import Heroes from "./components/Heroes.svelte"
	import Navbar from "./components/Navbar.svelte"
</script>

<main>
	<Navbar/>
	<h1>Dota Heroes</h1>
	<Heroes/>
</main>

<style>
	main {
		text-align: center;
		/* padding: 1em; */
		max-width: 240px;
		/* margin: 0 auto; */
		background-color: rgb(6, 33, 56);
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
<script>
	import Heroes from "./components/Heroes.svelte";
	import Navbar from "./components/Navbar.svelte";
</script>

<main>
	<h1>Dota Heroes</h1>
	<span class="span">
		<p>
			Hello, this is a demo project to show an application and example of
			using an external API. In this case,&nbsp;
		</p>
		<a href="https://docs.opendota.com">OpenDota API</a>
		<p>&nbsp;.</p>
		<p>&nbsp;This project is made using Svelte, See more at&nbsp;</p>
		<a href="https://svelte.dev/">Svelte.dev</a>
		<p>.</p>
	</span>
	<Heroes />
</main>

<style>
	main {
		text-align: center;
		max-width: 240px;
		background-color: rgb(6, 33, 56);
	}

	.span {
		display: flex;
		flex-direction: row;
		justify-content: center;
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

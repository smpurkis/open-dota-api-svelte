<script>
    import { Styles, Button } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte";
    import { heroView } from "./stores";

    const openDotaBaseUrl = "https://api.opendota.com/api/";

    async function loadJsonAwait(url) {
        let json = await (await fetch(url)).json();
        return json;
    }

    async function loadUrl(url) {
        console.log(url);
        let json = await loadJsonAwait(url);
        console.log(json);
        return json;
    }
    let heroes = loadUrl(openDotaBaseUrl + "heroes");

    async function importSpecialHeroNames() {
        let specialHeroSrcNames = await (
            await fetch("data/specialHeroNames.json")
        ).json();
        console.log(specialHeroSrcNames);
        return specialHeroSrcNames;
    }
    let specialHeroSrcNames = importSpecialHeroNames();
</script>

<div>
    {#if heroView != "none"}
        <p>No view!</p>
    {:else}
        <p>hello world</p>
    {/if}
    <div class="grid">
        {#await heroes then heroes}
            {#each heroes as hero}
                <CardTemplate {hero} {specialHeroSrcNames} />
            {/each}
        {/await}
    </div>
</div>
<Styles />

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 15vw));
        grid-gap: 1em;
        grid-auto-flow: row;
    }
</style>

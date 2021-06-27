<script>
    import { Styles, Button } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte";
    import { heroView } from "./stores";
    import HeroHoverOver from "./HeroHoverOver.svelte";

    const openDotaBaseUrl = "https://api.opendota.com/api/";

    async function loadJsonAwait(url) {
        let json = await (await fetch(url)).json();
        return json;
    }

    async function loadUrl(url) {
        let json = await loadJsonAwait(url);
        return json;
    }
    let heroes = loadUrl(openDotaBaseUrl + "heroes");
    let allHeroDetails = loadUrl("data/heroDetails.json");

    let heroToView = null;
    heroView.subscribe((hero) => {
        heroToView = hero;
    });
    $: openHeroHoverOver = heroToView != null;

    function sortHeroes(heroes) {
        return Object.values(heroes).sort(function (a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return textA < textB ? -1 : textA > textB ? 1 : 0;
                })
    }
</script>

<div>
    <HeroHoverOver
        bind:open={openHeroHoverOver}
        hero={heroToView}
        {allHeroDetails}
    />
    <div class="grid">
        {#await heroes then heroes}
            {#each sortHeroes(heroes) as hero}
                <CardTemplate {hero} {allHeroDetails} />
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
        justify-content: center;
    }
</style>

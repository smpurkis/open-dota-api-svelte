<script>
    import { Styles, Button } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte";
    import { heroView } from "./stores";
    import HeroHoverOver from "./HeroHoverOver.svelte";
    import { loadUrl, retrieveHeroData } from "./handleApi"

    let hero = null;
    let allHeroDetails = retrieveHeroData();
    
    const openDotaBaseUrl = "https://api.opendota.com/api/";
    let heroes = loadUrl(openDotaBaseUrl + "heroes");

    let heroToView = null;
    heroView.subscribe((hero) => {
        heroToView = hero;
    });
    $: openHeroHoverOver = heroToView != null;

    function sortHeroes(heroes) {
        console.log(heroes);
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
    />
    <div class="grid">
        {#await heroes then heroes}
            {#each sortHeroes(heroes) as hero}
                <CardTemplate {allHeroDetails} {hero}/>
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

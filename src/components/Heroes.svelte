<script>
    import { Styles, Button } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte";
    import HeroHoverOver from "./HeroHoverOver.svelte";
    import { heroView, heroSearchBarFilter } from "./stores";
    import { loadUrl, retrieveHeroData, loadPortraitSrc } from "./handleApi";
    import HeroFilters from "./HeroFilters.svelte";
    import { slide, fade } from "svelte/transition";
	import { flip } from 'svelte/animate';


    let hero = null;
    let allHeroDetails = retrieveHeroData();

    const openDotaBaseUrl = "https://api.opendota.com/api/";
    let heroes = loadUrl(openDotaBaseUrl + "heroes");

    let heroToView = null;
    heroView.subscribe((hero) => {
        heroToView = hero;
    });
    $: openHeroHoverOver = heroToView != null;

    let heroFilter = "";
    heroSearchBarFilter.subscribe((filter) => {
        heroFilter = filter;
    });

    $: sortHeroesAlphetically = (heroes, heroFilter) => {
        let sortedList = Object.values(heroes).sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });;
        sortedList = sortedList.filter((hero) => {
            if (heroFilter != "") {
                return hero.localized_name.toLowerCase().includes(heroFilter);
            } else {
                return hero;
            }
        });
        return sortedList;
    };
</script>

<div>
    <HeroHoverOver bind:open={openHeroHoverOver} />
    <HeroFilters />
    <div class="grid">
        {#await heroes then heroes}
            {#each sortHeroesAlphetically(heroes, heroFilter) as hero, index (hero)}
                <span
                in:fade={{duration: 1000}}
                out:fade={{duration: 500}}
                animate:flip={{duration: 1000}}
                >
                    <CardTemplate
                        {allHeroDetails}
                        {hero}
                        portraitSrc={loadPortraitSrc(
                            hero.localized_name,
                            allHeroDetails
                        )}
                    />
                </span>
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

<script>
    import { Styles, Button } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte";
    import HeroHoverOver from "./HeroHoverOver.svelte";
    import {
        heroView,
        heroSearchBarFilter,
        heroSearchBarFilterCategories,
    } from "./stores";
    import { loadUrl, retrieveHeroData, loadPortraitSrc } from "./handleApi";
    import HeroFilters from "./HeroFilters.svelte";
    import { slide, fade } from "svelte/transition";
    import { flip } from "svelte/animate";

    let allHeroDetails = retrieveHeroData();

    let heroToView = null;
    heroView.subscribe((hero) => {
        heroToView = hero;
    });
    $: openHeroHoverOver = heroToView != null;

    let heroFilter = "";
    heroSearchBarFilter.subscribe((filter) => {
        heroFilter = filter;
    });

    let enabledSearchOptions = {};
    heroSearchBarFilterCategories.subscribe((enabledOptions) => {
        enabledSearchOptions = enabledOptions;
    });

    $: sortHeroesAlphetically = (
        heroDetails,
        heroFilter,
        enabledSearchOptions
    ) => {
        console.log("options", enabledSearchOptions);
        console.log(heroDetails);
        let sortedList = Object.values(heroDetails).sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        sortedList = sortedList.filter((hero) => {
            if (heroFilter != "") {
                return hero.localized_name.toLowerCase().includes(heroFilter);
            } else {
                return hero;
            }
        });
        for (const searchCategory in enabledSearchOptions) {
            const options = enabledSearchOptions[searchCategory];
            const allowedOptions = Object.keys(options).filter(
                (key) => options[key] === "success"
            );
            sortedList = sortedList.filter((hero) => {
                let cond;
                if (typeof hero[searchCategory] === "string") {
                    cond = allowedOptions.some(
                        (option) =>
                            option.toLowerCase() ===
                            hero[searchCategory].toLowerCase()
                    );
                } else {
                    cond = allowedOptions.some((option) =>
                        hero[searchCategory].includes(option)
                    );
                }
                console.log(hero.name, searchCategory, cond);
                return cond;
            });
        }
        return sortedList;
    };
</script>

<div>
    <HeroHoverOver bind:open={openHeroHoverOver} />
    <HeroFilters />
    <div class="grid">
        {#await allHeroDetails then heroDetails}
            {#each sortHeroesAlphetically(heroDetails, heroFilter, enabledSearchOptions) as hero, index (hero)}
                <span
                    in:fade={{ duration: 1000 }}
                    out:fade={{ duration: 500 }}
                    animate:flip={{ duration: 1000 }}
                >
                    <CardTemplate
                        heroDetails={hero}
                        portraitSrc={loadPortraitSrc(hero.localized_name, hero)}
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

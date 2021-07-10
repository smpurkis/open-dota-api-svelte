<script>
    import { flip } from "svelte/animate";
    import { fade } from "svelte/transition";
    import { Styles } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte";
    import { loadPortraitSrc, retrieveHeroData } from "./handleApi";
    import HeroFilters from "./HeroFilters.svelte";
    import HeroHoverOver from "./HeroHoverOver.svelte";
    import {
        heroSearchBarFilter,
        heroSearchBarFilterCategories,
        heroView,
    } from "./stores";
    
    // Contains all the hero data
    let allHeroDetails = retrieveHeroData();

    // A store variable to communicate across the App (like Redux)
    let heroToView = null;
    heroView.subscribe((hero) => {
        heroToView = hero;
    });
    $: openHeroHoverOver = heroToView != null;

    // Update the search bar filter
    let heroFilter = "";
    heroSearchBarFilter.subscribe((filter) => {
        heroFilter = filter;
    });

    // Listen for when the hero filters updates
    let enabledSearchOptions = {};
    heroSearchBarFilterCategories.subscribe((enabledOptions) => {
        enabledSearchOptions = enabledOptions;
    });

    $: sortHeroes = (
        heroDetails,
        heroFilter,
        enabledSearchOptions
    ) => {

        // Sort the heroes into alphabetical order
        let sortedList = Object.values(heroDetails).sort(function (a, b) {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });

        // Filter heroes by the search bar text
        sortedList = sortedList.filter((hero) => {
            if (heroFilter != "") {
                return hero.localized_name.toLowerCase().includes(heroFilter);
            } else {
                return hero;
            }
        });

        // Filter heroes based on the hero filter categories
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
            {#each sortHeroes(heroDetails, heroFilter, enabledSearchOptions) as hero, index (hero)}
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

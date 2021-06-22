<script>
    import { Button } from "sveltestrap";

    export let hero;
    export let specialHeroSrcNames;

    let showFullInfo = false;

    const attrColors = {
        str: "rgba(130,21,21, 0.7)", // red
        agi: "rgba(50,150,30, 0.7)", // green
        int: "rgba(18,114,160, 0.7)", // blue
    };
    let attrColor = attrColors[hero.primary_attr];

    let heroSrcName = hero.localized_name
        .replaceAll(" ", "_")
        .replace("-", "")
        .toLowerCase();

    async function loadPortraitSrc(heroName, specialHeroSrcNames) {
        specialHeroSrcNames = await specialHeroSrcNames;
        if (heroName in specialHeroSrcNames) {
            heroName = specialHeroSrcNames[heroName];
        }
        return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`;
    }
    let portraitSrc = loadPortraitSrc(heroSrcName, specialHeroSrcNames);

    function onclick() {
        console.log(hero);
    }
</script>

<div>
    <div
        class="hero-card"
        style="--attr_color: {attrColor}"
        on:mouseenter={onclick}
    >
        <h2>{hero.localized_name}</h2>
        {#await portraitSrc then src}
            <img width="60%" {src} alt={hero.localized_name} loading="lazy" />
        {/await}
        <hr />
        <h5>{hero.primary_attr.toUpperCase()}</h5>
        <p>Roles: {hero.roles.join(", ")}</p>
        <Button color="primary" on:click={onclick}>Share</Button>
    </div>
</div>

<style>
    .hero-card {
        background-color: var(--attr_color);
        margin: 5px;
        padding: 5px;
        border: 2px dotted black;
        border-radius: 30px;
        transition: 0.1s;
        min-width: fit-content;
        width: 15vw;
        min-height: fit-content;
        max-height: 50vw;
        overflow: hidden;
    }

    .hero-card:hover {
        border: 5px solid black;
    }
</style>

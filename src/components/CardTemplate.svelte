<script>
    import { Button } from "sveltestrap";

    export let hero;
    export let allHeroDetails;
    import { heroView } from "./stores";

    let showFullInfo = false;

    const attrColors = {
        str: "rgba(130,21,21, 0.7)", // red
        agi: "rgba(50,150,30, 0.7)", // green
        int: "rgba(18,114,160, 0.7)", // blue
    };
    let attrColor = attrColors[hero.primary_attr];

    let heroSrcName = hero.localized_name;

    let portraitSrc = loadPortraitSrc(heroSrcName, allHeroDetails);

    async function loadPortraitSrc(heroName, allHeroDetails) {
        allHeroDetails = Object.values(await allHeroDetails);
        let portraitSrc = allHeroDetails.filter(
            (hero) => hero.name == heroName
        )[0].src;
        return portraitSrc;
    }

    async function onHeroEnter() {
        allHeroDetails = await allHeroDetails
        let heroDetails = allHeroDetails.filter(heroDets => heroDets.name == hero.localized_name)[0]
        heroView.set(heroDetails);
    }
</script>

<div>
    <div
        id="hero-hover-div-{hero.name}"
        class="hero-card"
        style="--attr_color: {attrColor}"
    >
        <h2>{hero.localized_name}</h2>
        {#await portraitSrc then src}
            <img {src} alt={hero.localized_name} loading="lazy" />
        {/await}
        <hr />
        <h5>Primary Attr: {hero.primary_attr.toUpperCase()}</h5>
        <p>Roles: {hero.roles.join(", ")}</p>
        <Button color="primary" on:click={onHeroEnter}>More Info</Button>
    </div>
</div>

<style>
    .hero-card {
        background-color: var(--attr_color);
        margin: 5px;
        padding: 5px;
        border: 2px solid black;
        border-radius: 30px;
        transition: 0.1s;
        min-width: fit-content;
        width: 15vw;
        min-height: fit-content;
        height: 100%;
        max-height: 50vw;
        overflow: hidden;
    }

    .hero-card:hover {
        border: 5px solid black;
    }

    img {
        border: 5px solid black;
        border-radius: 30px;
        width: 80%;
    }
</style>

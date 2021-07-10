<script>
    import { Button } from "sveltestrap";
    import { heroView } from "./stores";

    export let heroDetails;
    export let portraitSrc = "";

    // Set card background colour based on hero's primary attribute
    const attrColors = {
        str: "rgba(130,21,21, 0.7)", // red
        agi: "rgba(50,150,30, 0.7)", // green
        int: "rgba(18,114,160, 0.7)", // blue
    };
    let attrColor = attrColors[heroDetails.primary_attr];

    async function onHeroCardClick() {
        /**
         * Set hero modal data once a card show more button has been clicked
        */
        heroView.set(heroDetails);
    }
</script>

<div>
    <div
        id="hero-hover-div-{heroDetails.name}"
        class="hero-card"
        style="--attr_color: {attrColor}"
    >
        <h2>{heroDetails.localized_name}</h2>
        {#await portraitSrc then src}
            <img {src} alt={heroDetails.localized_name} loading="lazy" />
        {/await}
        <hr />
        <h5>Primary Attr: {heroDetails.primary_attr.toUpperCase()}</h5>
        <p>Roles: {heroDetails.roles.join(", ")}</p>
        <Button color="primary" on:click={onHeroCardClick}>More Info</Button>
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

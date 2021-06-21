<script>
    import { Styles, Button } from "sveltestrap";
    import CardTemplate from "./CardTemplate.svelte"

    const colors = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
    ];
    const openDotaBaseUrl = "https://api.opendota.com/api/";

    async function loadJsonAwait(url) {
        let resp = await fetch(url);
        let json = await resp.json();
        return json;
    }

    async function loadUrl(url) {
        console.log(url);
        let json = await loadJsonAwait(url);
        console.log(json);
        return json;
    }
    let heroes = loadUrl(openDotaBaseUrl + "heroes");

    function onclick() {
        console.log("Have clicked");
    }
</script>

<main>
    <!-- <div class="grid">
        {#each colors as color}
            <CardTemplate
            title={color}
            body="Example Body"
            color={color}
            buttonSrc="http://www.google.com"
            />
        {/each}
    </div>

    <p>Hello World!</p> -->

    <div class="grid">
        {#await heroes then heroes}
            {#each heroes as hero}
                <CardTemplate hero={hero}/>
            {/each}
        {/await}
    </div>
</main>
<Styles />

<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>

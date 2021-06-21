<script>
    export let hero;

    import { Button } from "sveltestrap";

    function onclick() {
        console.log("Have clicked");
    }
</script>

<div class="hero-card" on:mouseover={onclick}>
    <h2>{hero.localized_name}</h2>
    <hr />
    <img
        width="80%"
        src="https://i.ytimg.com/vi/SQJrYw1QvSQ/maxresdefault.jpg"
        alt=""
    />
    <p>Number of Legs: {hero.legs}</p>
    <Button color="primary" on:click={onclick}>Share</Button>
</div>

<style>
    .hero-card {
        background-color: white;
        display: flexbox;
        margin: 5px;
        padding: 10px;
        border: 1px solid red;
        border-radius: 50px;
        transition: 0.1s;
    }

    .hero-card:hover {
        border: 5px solid red;
    }
</style>

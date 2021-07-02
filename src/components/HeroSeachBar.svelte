<script>
    import { Input } from "sveltestrap";
    import { heroSearchBarFilter } from "./stores";

    let value = "";

    let setHeroSearchBarFilter = (event) => {
        console.log(event);
        let searchBarValue = ""
        if (event.key.length == 1) {
            searchBarValue = event.target.value + event.key 
        } else {
            searchBarValue = event.target.value
        }
        heroSearchBarFilter.set(searchBarValue);
    };
</script>

<div>
    <Input
        type="search"
        name="search"
        placeholder="Search Heroes"
        bind:value
        on:keydown={(event) => setHeroSearchBarFilter(event)}
    />
</div>

<style>
    div {
        width: 20vw;
    }
</style>

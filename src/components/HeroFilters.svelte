<script>
    import HeroFilter from "./HeroFilter.svelte";
    import HeroSearchBar from "./HeroSeachBar.svelte"

    const filterHeroes = async (heroes) => {};
    const roleOptions = ["Support", "Disabler", "Nuker", "Durable", "Initiator", "Jungler", "Carry", "Escape", "Pusher"].sort();
    const primaryAttributes = ["AGI", "INT", "STR"];
    const rangeOptions = ["Melee", "Ranged"];
</script>

<div>
    <HeroFilter buttonText="Range Options" options={rangeOptions} />
    <HeroFilter buttonText="Primary Attributes" options={primaryAttributes} />
    <HeroFilter buttonText="Roles" options={roleOptions} />
    <HeroSearchBar/>
</div>

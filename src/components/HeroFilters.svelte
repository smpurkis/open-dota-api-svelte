<script>
    import HeroFilter from "./HeroFilter.svelte";
    import HeroSearchBar from "./HeroSeachBar.svelte"

    const filterHeroes = async (heroes) => {};
    const roleOptions = ["Support", "Disabler", "Nuker", "Durable", "Initiator", "Jungler", "Carry", "Escape", "Pusher"].sort();
    const primaryAttributes = ["AGI", "INT", "STR"];
    const rangeOptions = ["Melee", "Ranged"];
</script>

<div>
    <HeroFilter filterName="roles" buttonText="Range Options" options={rangeOptions} />
    <HeroFilter filterName="primary_attributes" buttonText="Primary Attributes" options={primaryAttributes} />
    <HeroFilter filterName="range" buttonText="Roles" options={roleOptions} />
    <HeroSearchBar/>
</div>

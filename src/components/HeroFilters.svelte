<script>
    import HeroFilter from "./HeroFilter.svelte";
    import HeroSearchBar from "./HeroSeachBar.svelte";

    // All the current category options
    const filterHeroes = async (heroes) => {};
    const roleOptions = ["Support", "Disabler", "Nuker", "Durable", "Initiator", "Jungler", "Carry", "Escape", "Pusher"].sort();
    const primaryAttributes = ["AGI", "INT", "STR"];
    const rangeOptions = ["Melee", "Ranged"];
</script>

<div>
    <HeroFilter filterName="attack_type" buttonText="Range Options" options={rangeOptions} />
    <HeroFilter filterName="primary_attr" buttonText="Primary Attributes" options={primaryAttributes} />
    <HeroFilter filterName="roles" buttonText="Roles" options={roleOptions} />
    <HeroSearchBar/>
</div>

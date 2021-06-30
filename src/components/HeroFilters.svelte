<script>
    import HeroFilter from "./HeroFilter.svelte";

    const filterHeroes = async (heroes) => {};
    const roleOptions = ["Support", "Disabler", "Nuker", "Durable", "Initiator", "Jungler", "Carry", "Escape", "Pusher"].sort();
    const primaryAttributes = ["AGI", "INT", "STR"];
    const rangeOptions = ["Melee", "Ranged"];
</script>

<div>
    <HeroFilter buttonText="Range Options" options={rangeOptions} />
    <HeroFilter buttonText="Primary Attributes" options={primaryAttributes} />
    <HeroFilter buttonText="Roles" options={roleOptions} />
    <p>// Add Roles, Melee or Ranged, A Hero search bar filters</p>
</div>

<style>
</style>

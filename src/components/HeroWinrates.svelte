<script>
    import { heroView } from "./stores";

    let heroData;
    heroView.subscribe((hero) => {
        heroData = hero;
    });
    const rangeEight = [...Array(8).keys()]
    const pickProperyNames = rangeEight.map((i) => `${i + 1}_pick`);
    const winProperyNames = rangeEight.map((i) => `${i + 1}_win`);

    const getWinrateForPickOrder = (pickNumber) => {
        return Math.round(1000*heroData[`${pickNumber}_win`] / heroData[`${pickNumber}_pick`])/10
    }
    let pickWinrates = rangeEight.map(i => getWinrateForPickOrder(i+1));
    const overallWinrate =
        Math.round((1000 * winProperyNames.map((win) => heroData[win]).reduce((a, b) => a + b)) /
        pickProperyNames.map((pick) => heroData[pick]).reduce((a, b) => a + b))/10;
</script>

<div>
    {#each pickWinrates as pickWinrate, index}
         <p>Pick {index+1}: {pickWinrate}%</p>
    {/each}
    <p>Overall winrate {overallWinrate}%</p>
</div>

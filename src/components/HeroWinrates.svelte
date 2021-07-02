<script>
    import { heroView } from "./stores";
    import { Table } from "sveltestrap";

    let heroData;
    heroView.subscribe((hero) => {
        heroData = hero;
    });
    const rangeEight = [1, 2, 3, 4, 5, 6, 7, 8];
    const pickProperyNames = rangeEight.map((i) => `${i}_pick`);
    const winProperyNames = rangeEight.map((i) => `${i}_win`);

    const getWinrateForPickOrder = (pickNumber) => {
        return {
            name: `Pick ${pickNumber}`,
            winrate:
                Math.round(
                    (1000 * heroData[`${pickNumber}_win`]) /
                        heroData[`${pickNumber}_pick`]
                ) / 10,
        };
    };

    const getWinrateForPick = (name, win, pick) => {
        return {
            name: name,
            winrate: Math.round((1000 * heroData[win]) / heroData[pick]) / 10,
        };
    };
    let pickWinrates = rangeEight.map((i) => getWinrateForPickOrder(i));
    pickWinrates.push(getWinrateForPick("Pro Pick", "pro_win", "pro_pick"));
    pickWinrates.push(
        getWinrateForPick("Turbo Pick", "turbo_wins", "turbo_picks")
    );
    const overallWinrate =
        Math.round(
            (1000 *
                winProperyNames
                    .map((win) => heroData[win])
                    .reduce((a, b) => a + b)) /
                pickProperyNames
                    .map((pick) => heroData[pick])
                    .reduce((a, b) => a + b)
        ) / 10;
    pickWinrates.push({ name: "Overall", winrate: overallWinrate });
</script>

<h4>Winrates</h4>
<div>
    <Table>
        <thead>
            {#each pickWinrates as pick}
                <th>{pick.name}</th>
            {/each}
        </thead>
        <tbody>
            {#each pickWinrates as pick}
                <td>{pick.winrate}%</td>
            {/each}
        </tbody>
    </Table>
</div>

<style>
    h4 {
        text-align: center;
    }
</style>

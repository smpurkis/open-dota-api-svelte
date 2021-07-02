<script>
    import { heroView } from "./stores";
    import { loadUrl, openDotaBaseUrl } from "./handleApi";
    import { Table } from "sveltestrap";

    let heroData;
    heroView.subscribe((hero) => {
        heroData = hero;
    });

    let sortColumn = "match_id";
    let ascending = 1;
    $: heroMatches = sort(sortColumn, ascending);

    $: columns = {
        match_id: "(^)",
        duration: "",
        radiant: "",
        radiant_win: "",
        kills: "",
    };

    function setSortColumn(column) {
        sortColumn = column;
        ascending = ascending === 1 ? -1 : 1;
        columns = {
            match_id: "",
            duration: "",
            radiant: "",
            radiant_win: "",
            kills: "",
        };
        let ascendingSymbol = ascending === 1 ? "^" : "v";
        columns[column] = `(${ascendingSymbol})`;
    }

    let sort = async (column, ascending) => {
        let awaitedMatches = await loadUrl(
            openDotaBaseUrl + `/heroes/${heroData.id}/matches`
        );
        awaitedMatches = Object.values(awaitedMatches);
        let sortFn = (a, b) => {
            return a[column] < b[column]
                ? 1 * ascending
                : a[column] > b[column]
                ? -1 * ascending
                : 0;
        };
        awaitedMatches.sort(sortFn);
        return awaitedMatches;
    };
</script>

<div>
    <h4>Recent Matches</h4>
    {#await heroMatches then matches}
        <Table>
            <thead>
                <tr>
                    <th on:click={() => setSortColumn("match_id")}
                        >Match ID {columns["match_id"]}</th
                    >
                    <th on:click={() => setSortColumn("duration")}
                        >Duration {columns["duration"]}</th
                    >
                    <th on:click={() => setSortColumn("radiant")}
                        >Side {columns["radiant"]}</th
                    >
                    <th on:click={() => setSortColumn("radiant_win")}
                        >Victor {columns["radiant_win"]}</th
                    >
                    <th on:click={() => setSortColumn("kills")}
                        >K/D/A {columns["kills"]}</th
                    >
                </tr>
            </thead>
            {#each matches as match}
                <tbody>
                    <tr>
                        <td>
                            <a
                                href="https://www.dotabuff.com/matches/{match.match_id}"
                                target="_">{match.match_id}</a
                            >
                        </td>
                        <td
                            >{Math.round(match.duration / 60)}:
                            {Math.round(match.duration % 60) < 10
                                ? `0${Math.round(match.duration % 60)}`
                                : Math.round(match.duration % 60)}
                        </td>
                        <td>{match.radiant ? "Radiant" : "Dire"}</td>
                        <td>{match.radiant_win ? "Radiant" : "Dire"}</td>
                        <td>{match.kills}/{match.deaths}/{match.assists}</td>
                    </tr>
                </tbody>
            {/each}
        </Table>
    {:catch error}
        <p>{error}</p>
    {/await}
</div>

<style>
    h4 {
        text-align: center;
    }
    
    th {
        outline: grey solid 3px;
        transition: all 0.2s;
    }

    th:hover {
        outline: grey solid 6px;
        outline-offset: -6px;
    }
</style>

<script>
    import { Button,Fade,Modal } from "sveltestrap";
    import HeroMatches from "./HeroMatches.svelte";
    import HeroWinrates from "./HeroWinrates.svelte";
    import { heroView } from "./stores";

    // Modal is disabled on App load
    export let open = false;

    // Retrieve hero data from store
    let heroData;
    heroView.subscribe((hero) => {
        heroData = hero;
    });

    async function loadDescription(heroData) {
        /**
         * Set hero description from hero data
        */
        if (heroData != null) {
            return heroData.description;
        } else {
            return "Loading...";
        }
    }
    $: descriptionPromise = loadDescription(heroData);

    let openLink = (link) => {
        window.open(link);
    };

    const toggle = async () => {
        open = !open;
        heroView.set(null);
    };
</script>

<div>
    <Fade isOpen={open}>
        <Modal isOpen={true} {toggle} size="xl">
            <div class="modal-class">
                <br />
                <h1>{heroData.localized_name}</h1>
                <hr />
                <div class="body">
                    {#await descriptionPromise then d}
                        <div class="img">
                            <img src={heroData.src} alt="hero portrait" />
                        </div>
                        <div class="paragraph">
                            <p>{d}</p>
                        </div>
                    {:catch err}
                        <p>{err.message}</p>
                    {/await}
                </div>
                <HeroWinrates />
                <h4>Useful Links</h4>
                <div class="button">
                    <Button color="primary" on:click={() => openLink(`https://dota2.fandom.com/wiki/${heroData.localized_name}`)}
                        >Wiki</Button
                    >
                    <Button color="primary" on:click={() => openLink(`https://www.dotabuff.com/heroes/${heroData.localized_name.split(" ").join("-").toLowerCase()}`)}
                        >DotaBuff</Button
                    >
                    <Button color="primary" on:click={() => openLink(`https://www.opendota.com/heroes/${heroData.id}`)}
                        >OpenDota</Button
                    >
                    <Button color="primary" on:click={() => openLink(`https://www.dota2.com/hero/${heroData.localized_name.split(" ").join("").toLowerCase()}`)}
                        >Official Dota</Button
                    >
                </div>
                <hr />
                <div class="button-cancel">
                    <Button color="danger" on:click={toggle}>Cancel</Button>
                </div>
                <HeroMatches />
            </div>
        </Modal>
    </Fade>
</div>

<style>
    h4 {
        text-align: center;
    }

    .button {
        text-align: center;
    }

    .button-cancel {
        text-align: right;
    }

    .modal-class {
        margin: 10px;
    }

    .paragraph {
        display: flex;
        flex-direction: row;
    }

    .img {
        margin-bottom: 5px;
        padding-right: 10px;
        margin-left: auto;
        margin-right: auto;
    }

    img {
        border: 5px solid black;
        border-radius: 30px;
    }

    .body {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    h1 {
        text-align: center;
    }

    p {
        text-align: justify;
        padding-right: 10px;
    }
</style>

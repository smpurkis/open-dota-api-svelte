<script>
    import { Button, Modal, Fade } from "sveltestrap";
    import { heroView } from "./stores";

    export let open = false;
    export let hero = null;
    export let allHeroDetails;

    let heroData;
    async function loadDescription(hero, allHeroDetails) {
        if (hero != null) {
            allHeroDetails = await allHeroDetails;
            heroData = await Object.values(allHeroDetails).filter(
                (heroData) => heroData.name == hero.localized_name
            )[0];
            return heroData.description;
        } else {
            return "Loading...";
        }
    }
    $: descriptionPromise = loadDescription(hero, allHeroDetails);

    let openLink = () => {
        window.open(`https://dota2.fandom.com/wiki/${hero.localized_name}`);
    };

    const toggle = async () => {
        open = !open;
        heroView.set(null);
    };
</script>

<div>
    <Fade isOpen={open}>
        <Modal isOpen={true} {toggle} size="xl">
            <br />
            <h1>{hero.localized_name}</h1>
            <hr />
            <div class="body">
                {#await descriptionPromise then d}
                    <div class="paragraph">
                        <p>{d.split(" ").slice(0, (d.split(" ").length/2)).join(" ")}</p>
                        <p>{d.split(" ").slice((d.split(" ").length/2), d.split(" ").length).join(" ")}</p>
                    </div>
                    <div class="img">
                        <img src={heroData.src} alt="hero portrait" />
                    </div>
                {:catch err}
                    <p>{err.message}</p>
                {/await}
            </div>
            <div>
                <Button on:click={openLink}>Wiki Page</Button>
            </div>
            <hr />
            <Button color="danger" on:click={toggle}>Cancel</Button>
        </Modal>
    </Fade>
</div>

<style>
    .paragraph {
        display: flex;
        flex-direction: row;
    }
    
    .img {
        margin-top: 30px;
        padding-right: 10px;
    }

    img {
        border: 5px solid black;
        border-radius: 30px;
    }

    .body {
        display: flex;
    }

    h1 {
        text-align: center;
    }

    p {
        text-align: justify;
        /* text-align-last: justify; */
        margin: 10px;
        max-width: 50%;
    }
</style>

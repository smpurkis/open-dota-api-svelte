<script>
    import { Button } from "sveltestrap";
    import { fade, fly, slide } from "svelte/transition";
    import { flip } from "svelte/animate";

    export let buttonText;
    export let options;
    let showOptions = true;
    const toggleShow = () => (showOptions = !showOptions);

    const enabledOptionsTemp = {};
    options.map((option) => {
        enabledOptionsTemp[option] = "success";
    });
    $: enabledOptions = enabledOptionsTemp;

    const switchOption = (option) => {
        const included = enabledOptions[option] === "success";
        if (included) {
            enabledOptions[option] = "danger";
        } else {
            enabledOptions[option] = "success";
        }
        console.log(enabledOptions);
    };
</script>

<div class="div">
    <div class="filter-div">
        <button on:click={toggleShow} class="button">Show {buttonText}</button>
        {#if showOptions}
            <span>
                {#each Object.entries(enabledOptions) as option}
                    <button
                        in:fly={{ x: 200, duration: 1500 }}
                        out:fly={{ x: 200, duration: 1500 }}
                        class={`button ${option[1]}`}
                        on:click={() => switchOption(option[0])}
                        >{option[0]}</button
                    >
                    <!---->
                {/each}
            </span>
        {/if}
    </div>
</div>

<style>
    .div {
        display: flex;
        flex-direction: row;
    }

    .button {
        background-color: rgb(0, 102, 255);
        color: white;
        border-color: rgb(31, 73, 133);
        vertical-align: middle;
        border-radius: 0.25rem;
        padding: 0.375rem 0.75rem;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
            border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    .success {
        background-color: rgb(35, 150, 79);
        border-color: rgb(73, 158, 107);
    }

    .success:hover {
        background-color: rgb(21, 94, 49);
    }

    .danger {
        background-color: rgb(165, 33, 37);
        border-color: rgb(124, 44, 46);
    }

    .danger:hover {
        background-color: rgb(87, 17, 20);
    }

    .filter-div {
        margin-bottom: 5px;
    }
</style>

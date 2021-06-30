<script>
    import {
        Dropdown,
        DropdownItem,
        DropdownMenu,
        DropdownToggle,
        Input,
        Button
    } from "sveltestrap";

    export let buttonText;
    export let options;
    $: enabledOptions = options;

    const switchOption = (option) => {
        const included = enabledOptions.includes(option)
        if (included) {
            enabledOptions = enabledOptions.filter(item => item != option)
        } else {
            enabledOptions = [...enabledOptions, option]
        }
        console.log(enabledOptions);
    }
</script>

<div class="div">
    <Dropdown color="primary">
        <div class="filter-div">
            <DropdownToggle caret>{buttonText}</DropdownToggle>
            {#each enabledOptions as option}
                <button class="test" on:click={() => switchOption(option)} color="primary">{option}</button>
                <Button class="test" on:click={() => switchOption(option)} color="primary">{option}</Button>
            {/each}
        </div>
        <DropdownMenu>
            {#each options as option}
                <DropdownItem on:click={() => switchOption(option)}>{option}</DropdownItem>
            {/each}
        </DropdownMenu>
    </Dropdown>
</div>

<style>
    .div {
        display: flex;
        flex-direction: row;
    }

    .test {
        background-color: rgb(0, 102, 255);
        color: white;
        border-color: rgb(31, 73, 133);
        vertical-align: middle;
        border-radius: .25rem;
        padding: .375rem .75rem;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .test:hover {
        background-color: rgb(0, 93, 231);
    }

    .filter-div {
        margin-right: 5px;
    }
</style>
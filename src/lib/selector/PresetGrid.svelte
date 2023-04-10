<script>
    export let presetNames, presetList, selectPreset;
</script>

<main>
    <h4>welcome to d3 frontend</h4>
    <h6>pick a preset to get started</h6>
    <div class="presetGrid">
        {#each presetList as _, i}
            <button
                class="presetButton"
                on:click={() => selectPreset(i)}
            >
                <h2>{presetNames[i]}</h2>
            </button>
        {/each}
    </div>
</main>

<style lang="postcss">
    main {
        @apply flex flex-col h-full p-16 lg:p-24 2xl:p-32;
    }
    .presetGrid {
        @apply grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 mt-8 flex-grow;
    }
    .presetButton {
        @apply btn btn-primary h-full;
    }
</style>

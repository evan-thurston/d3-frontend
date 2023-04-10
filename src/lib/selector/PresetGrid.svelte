<script>
    export let presetNames, presetList, selectPreset;
</script>

<div class="presetGrid">
    {#each presetList as _, i}
        <button
            class="presetButton"
            on:click={() => selectPreset(i)}
        >
            <h5>{presetNames[i]}</h5>
        </button>
    {/each}
</div>

<style lang="postcss">
    .presetGrid {
        @apply grid grid-cols-3 p-32 gap-8 h-full;
    }
    .presetButton {
        @apply btn btn-primary h-full;
    }
</style>

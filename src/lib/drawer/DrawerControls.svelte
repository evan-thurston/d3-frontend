<script>
    import LeftArrow from '../icons/LeftArrow.svelte';
    // import Pause from '../icons/Pause.svelte';
    // import Play from '../icons/Play.svelte';
    import RightArrow from '../icons/RightArrow.svelte';
    import User from '../icons/User.svelte';

    export let currentView, open, selectedNodes;

    let hasntDiscovered = true;
</script>

<div class="controls">
    <button
        class="primaryButton"
        on:click={() => ((open = !open), (hasntDiscovered = false))}
    >
        {#if open}
            <RightArrow />
        {:else}
            <LeftArrow />
        {/if}
    </button>
    <button
        class={!open || currentView !== 0 ? 'primaryButton' : 'disabledButton'}
        class:animate-bounce={!open &&
            hasntDiscovered &&
            selectedNodes.length > 0}
        on:click={() => {
            if (!open) open = !open;
            currentView = 0;
        }}
    >
        DATA
    </button>
    <!-- <button
        class={open && currentView !== 1 ? 'primaryButton' : 'disabledButton'}
        on:click={() => (tickerPaused = !tickerPaused)}
    >
        {#if tickerPaused}
            <Play />
        {:else}
            <Pause />
        {/if}
    </button> -->
    <button
        class={!open || currentView !== 1 ? 'primaryButton' : 'disabledButton'}
        on:click={() => {
            if (!open) open = !open;
            currentView = 1;
        }}
    >
        EVENTS
    </button>
    <button
        class={!open || currentView !== 2 ? 'primaryButton' : 'disabledButton'}
        on:click={() => {
            if (!open) open = !open;
            currentView = 2;
        }}
    >
        <User />
    </button>
</div>

<style lang="postcss">
    .controls {
        @apply fixed px-4 -translate-x-full py-8 flex flex-col space-y-8 bg-base-200 rounded-l-xl shadow-xl;
    }
</style>

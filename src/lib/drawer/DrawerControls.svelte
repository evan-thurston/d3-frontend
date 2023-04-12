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
        class="2xl:mb-4 primaryButton"
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
        @apply fixed p-4 2xl:-translate-x-full
        flex flex-row 2xl:flex-col space-x-4 2xl:space-x-0 2xl:space-y-4 top-32
        bg-base-200 rounded-l-xl shadow-xl w-full 2xl:w-auto justify-center;
        @media (max-width: 1536px) {
            left: 0px;
        }
    }
</style>

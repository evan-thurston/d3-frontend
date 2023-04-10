<script>
    import { slide } from 'svelte/transition';
    import DownArrow from '../icons/DownArrow.svelte';
    import Pause from '../icons/Pause.svelte';
    import Play from '../icons/Play.svelte';
    import Restart from '../icons/Restart.svelte';
    import UpArrow from '../icons/UpArrow.svelte';
    import AmountSelector from './AmountSelector.svelte';
    import Home from '../icons/Home.svelte';

    export let physicsPaused,
        emitterIndex,
        emitters,
        simulationSelected,
        interval,
        updateList,
        progress,
        updatesPaused,
        grid,
        restart;

    let width, height;

    $: panelShowing = width > 1536;
</script>

<svelte:window
    bind:innerWidth={width}
    bind:innerHeight={height}
/>

<main>
    <div class="panelInfo">
        <h3 class="panelTitle">control panel</h3>
        <button
            on:click={() => (panelShowing = !panelShowing)}
            class="primaryButton"
        >
            {#if panelShowing}
                <DownArrow />
            {:else}
                <UpArrow />
            {/if}
        </button>
    </div>

    {#if panelShowing}
        <div
            class="controlWrapper"
            transition:slide
        >
            <div>
                <button
                    class="primaryButton"
                    on:click={() => (simulationSelected = false)}
                >
                    <Home />
                </button>
                <div>
                    <AmountSelector
                        label="Node emitting:"
                        value={emitters[emitterIndex].id}
                        dec={() => {
                            emitterIndex--;
                            // progress = interval / 10;
                        }}
                        inc={() => {
                            emitterIndex++;
                            // progress = interval / 10;
                        }}
                        decLimit={emitterIndex <= 0}
                        incLimit={emitterIndex >= emitters.length - 1}
                    />
                </div>
            </div>
            <div>
                <button
                    class="primaryButton"
                    on:click={() => (updatesPaused = !updatesPaused)}
                >
                    {#if updatesPaused}
                        <Play />
                    {:else}
                        <Pause />
                    {/if}
                </button>
                <div>
                    <AmountSelector
                        label="Updates every {interval / 1000}s"
                        value="Updates: {updateList.length}"
                        dec={() => {
                            interval += 1000;
                            progress = interval / 10;
                        }}
                        inc={() => {
                            interval -= 1000;
                            progress = interval / 10;
                        }}
                        decLimit={interval >= 10000}
                        incLimit={interval <= 1000}
                        type="speed"
                    />
                </div>
            </div>
            <div class="lastRow">
                <div>
                    <AmountSelector
                        label="Grid Size:"
                        value={grid > 0 ? `${grid}px` : 'NONE'}
                        dec={() => (grid -= 30)}
                        inc={() => (grid += 30)}
                        decLimit={grid <= 0}
                        incLimit={grid >= Math.round(height / 10)}
                    />
                </div>
                <div class="flex flex-row justify-center space-x-4">
                    <button
                        class="primaryButton"
                        on:click={restart()}
                    >
                        <Restart />
                    </button>

                    <button
                        class="primaryButton"
                        on:click={() => (physicsPaused = !physicsPaused)}
                    >
                        physics {physicsPaused ? 'off' : 'on'}
                    </button>
                </div>
            </div>
            <div />
            <progress
                class="progress progress-primary"
                value={progress}
                max={interval}
            />
        </div>
    {/if}
</main>

<style lang="postcss">
    main {
        @apply flex flex-col
        bg-base-100 rounded-t-xl xl:rounded-xl
        fixed bottom-0 xl:bottom-8 xl:left-8 w-full xl:w-1/3 max-w-md
        border-2 border-base-300 shadow-xl;
    }
    div.controlWrapper {
        @apply flex flex-col items-center space-y-2 bg-base-200 px-8 xl:rounded-b-xl py-4;
    }
    div.controlWrapper > div:not(.lastRow) {
        @apply flex flex-row space-x-4;
    }
    div.lastRow {
        @apply flex flex-col space-y-2 2xl:flex-row 2xl:space-y-0 2xl:space-x-4;
    }
    div.panelInfo {
        @apply flex flex-row space-x-4 mx-8 my-4 justify-between;
    }
    .panelTitle {
        @apply my-auto uppercase;
    }
</style>

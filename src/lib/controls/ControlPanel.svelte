<script>
    import { slide } from 'svelte/transition';
    import DownArrow from '../icons/DownArrow.svelte';
    import Pause from '../icons/Pause.svelte';
    import Play from '../icons/Play.svelte';
    import Restart from '../icons/Restart.svelte';
    import UpArrow from '../icons/UpArrow.svelte';
    import AmountSelector from './AmountSelector.svelte';

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

    let width;

    $: panelShowing = width > 1536;
</script>

<svelte:window bind:innerWidth={width} />

<main>
    <div class="panelInfo">
        <h3 class="panelTitle">ctrl panel</h3>
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
                    new preset
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
            <div>
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
                <div>
                    <AmountSelector
                        label="Grid Size:"
                        value={grid > 0 ? `${grid}px` : 'NONE'}
                        dec={() => (grid -= 30)}
                        inc={() => (grid += 30)}
                        decLimit={grid <= 0}
                        incLimit={grid >= Math.round(width / 10)}
                    />
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
    div.controlWrapper {
        @apply flex flex-col items-center space-y-2 bg-base-200 px-8 rounded-b-xl py-4;
    }
    div.controlWrapper > div {
        @apply flex flex-row space-x-4;
    }
    main {
        @apply flex flex-col
        bg-base-100 rounded-xl
        fixed bottom-8 left-8 w-1/4;
    }
    div.panelInfo {
        @apply flex flex-row space-x-4 mx-8 my-4 justify-between;
    }
    .panelTitle {
        @apply my-auto uppercase;
    }
</style>

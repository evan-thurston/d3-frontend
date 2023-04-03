<script>
    import AmountSelector from "./AmountSelector.svelte";

    export let reset,
        resetProg,
        togglePhysics,
        physicsPaused,
        interval,
        incInterval,
        decInterval,
        group,
        incGroup,
        decGroup,
        updatesPaused,
        groupLimit,
        toggleUpdates,
        grid,
        incGrid,
        decGrid,
        updates,
        progress,
        newPreset,
        nodeEmitting,
        nodeIndex,
        nextNode,
        prevNode,
        nodeCount;

    let width;

    $: panelShowing = width > 1536;
</script>

<svelte:window bind:innerWidth={width} />

<div class="wrapper">
    <button
        on:click={() => (panelShowing = !panelShowing)}
        class="collapse"
        class:noMb={!panelShowing}
    >
        {#if panelShowing}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
            </svg>
        {:else}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
            </svg>
        {/if}
    </button>
    {#if panelShowing}
        <div class="flex flex-row justify-center 2xl:justify-between">
            <div
                class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 items-center justify-center mb-4"
            >
                <div class="flex flex-row space-x-4">
                    <button on:click={togglePhysics}
                        >physics {physicsPaused ? "off" : "on"}</button
                    >
                    <!-- <AmountSelector
                        label="Group emitting:"
                        value="Group {group}"
                        dec={() => {
                            decGroup();
                            resetProg();
                        }}
                        inc={() => {
                            incGroup();
                            resetProg();
                        }}
                        decLimit={group <= 1}
                        incLimit={group >= groupLimit}
                    /> -->
                    <AmountSelector
                        label="Node emitting:"
                        value={nodeEmitting}
                        dec={() => {
                            prevNode();
                            resetProg();
                        }}
                        inc={() => {
                            nextNode();
                            resetProg();
                        }}
                        decLimit={nodeIndex <= 0}
                        incLimit={nodeIndex >= nodeCount - 1}
                    />
                </div>
            </div>
        </div>
        <div
            class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 items-center justify-center mb-4"
        >
            <button on:click={newPreset()}>New Preset</button>
            <div class="flex flex-row space-x-4">
                <AmountSelector
                    label="Updates every {interval / 1000}s"
                    value="Updates: {updates}"
                    dec={incInterval}
                    inc={decInterval}
                    decLimit={interval >= 10000}
                    incLimit={interval <= 1000}
                    type="speed"
                />
            </div>
        </div>
        <div
            class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 items-center justify-center mb-4"
        >
            <button
                on:click={() => {
                    reset();
                    resetProg();
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </svg>
            </button>
            <button on:click={toggleUpdates()}>
                {#if updatesPaused}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                        />
                    </svg>
                {/if}
            </button>
            <AmountSelector
                label="Grid Size:"
                value="{grid - 1}px"
                dec={decGrid}
                inc={incGrid}
                decLimit={grid <= 1}
                incLimit={grid >= Math.round(width / 10)}
            />
        </div>

        <progress class='progress progress-primary' value={progress} max={interval} />
    {/if}
</div>

<style lang="postcss">
    button:not(.collapse):not(.desktopOpen):not(.hidden) {
        @apply btn btn-primary;
    }
    button.collapse {
        @apply bg-primary p-2 rounded-full mx-auto mb-2 md:mb-4;
    }
    button.disabled {
        @apply btn-disabled;
    }
    button.noMb {
        @apply mb-0 md:mb-0;
    }
    /* progress {
        @apply progress w-auto progress-primary;
    } */
    .wrapper {
        @apply fixed bottom-8 left-8 bg-base-200 rounded-xl px-8 py-4 max-w-md;
    }
</style>

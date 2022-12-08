<script>
    import AmountSelector from "./AmountSelector.svelte";

    export let reset,
        resetProg,
        toggle,
        jsonEdit,
        swapData,
        updateData,
        interval,
        incInterval,
        decInterval,
        group,
        incGroup,
        decGroup,
        paused,
        groupLimit,
        pauseUpdates,
        grid,
        incGrid,
        decGrid,
        width,
        updates,
        progress;

    let downArrow = "/down_arrow.svg",
        upArrow = "/up_arrow.svg",
        restart = "/restart.svg",
        pause = "/pause.svg",
        play = "/play.svg",
        rewind = "/rewind.svg",
        fastforward = "/fastforward.svg",
        subtract = "/subtract.svg",
        add = "/add.svg";

    let panelShowing = false;
</script>

<button
    on:click={() => (panelShowing = !panelShowing)}
    class="collapse"
    class:noMb={!panelShowing}
>
    {#if panelShowing}
        <img
            class="w-6 h-6 opacity-50"
            alt="close control panel"
            src={downArrow}
        />
    {:else}
        <img
            class="w-6 h-6 opacity-50"
            alt="open control panel"
            src={upArrow}
        />
    {/if}
</button>
{#if panelShowing || width > 1536}
    <div
        class="flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 items-center justify-center mb-4"
    >
        <div class="flex flex-row space-x-4">
            <button
                on:click={() => {
                    reset();
                    resetProg();
                }}
            >
                <img
                    class="w-6 h-6 opacity-50"
                    alt="restart simulation"
                    src={restart}
                />
            </button>
            <button on:click={toggle}>toggle physics</button>
            <button on:click={pauseUpdates(!paused)}>
                {#if paused}
                    <img
                        class="w-6 h-6 opacity-50"
                        alt="unpause data transfer"
                        src={play}
                    />
                {:else}
                    <img
                        class="w-6 h-6 opacity-50"
                        alt="pause data transfer"
                        src={pause}
                    />
                {/if}
            </button>
        </div>
        <div class="flex flex-row space-x-4">
            <button
                on:click={() => {
                    swapData();
                    resetProg();
                }}>Swap data</button
            >
            <button on:click={jsonEdit}>edit</button>
            <button on:click={updateData}> save </button>
        </div>
    </div>
    <div
        class="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0 items-center justify-center mb-4"
    >
        <AmountSelector
            label="Grid Size:"
            value="{grid - 1}px"
            dec={decGrid}
            inc={incGrid}
            decLimit={grid <= 1}
            incLimit={grid >= 60}
            decSvg={subtract}
            incSvg={add}
        />
        <AmountSelector
            label="Updates every {interval / 1000}s"
            value="Updates: {updates}"
            dec={incInterval}
            inc={decInterval}
            decLimit={interval >= 10000}
            incLimit={interval <= 1000}
            decSvg={rewind}
            incSvg={fastforward}
        />
        <AmountSelector
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
            decSvg={subtract}
            incSvg={add}
        />
    </div>

    <progress value={progress} max={interval} />
{/if}

<style lang="postcss">
    button:not(.collapse) {
        @apply btn btn-primary;
    }
    button.collapse {
        @apply bg-primary p-2 rounded-full mx-auto mb-4 md:mb-8 2xl:hidden 2xl:mb-0 2xl:p-0;
    }
    button.disabled {
        @apply btn-disabled;
    }
    button.noMb {
        @apply mb-0 md:mb-0;
    }
    progress {
        @apply progress w-auto progress-primary;
    }
</style>

<script>
    import { onMount } from "svelte";

    let downArrow = "/down_arrow.svg",
        upArrow = "/up_arrow.svg",
        restart = "/restart.svg",
        pause = "/pause.svg",
        play = "/play.svg",
        rewind = "/rewind.svg",
        fastforward = "/fastforward.svg",
        subtract = "/subtract.svg",
        add = "/add.svg";

    let left = 100,
        top,
        right,
        bottom = 100;

    export let reset,
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
        decGrid;

    let height, width, h, w;
    let moving = false;

    onMount(() => {
        top = height - 100;
        right = width - w - 100;
    });

    const onMouseDown = () => {
        moving = true;
    };

    const onMouseMove = (e) => {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
            right -= e.movementX;
            bottom -= e.movementY;
        }
    };

    const onMouseUp = (e) => {
        if (moving) {
            if (e.clientX < width / 2) {
                left = 100;
                right = width - w - 100;
            } else {
                right = 100;
                left = width - w - 100;
            }
            if (e.clientY < height / 2) {
                top = 100 + h;
                bottom = height - 100 - h;
            } else {
                top = height - 100;
                bottom = 100;
            }
        }
        moving = false;
    };
    let updateInterval, progressInterval;
    let updates = 0;
    let progress = 100;
    let panelShowing = false;

    const incr = () => {
        updates++;
    };
    const prog = () => {
        if (progress < interval) progress += interval / 10;
        else progress = interval / 10;
    };

    const resetProg = () => {
        updates = 0;
        clearInterval(updateInterval);
        updateInterval = setInterval(incr, interval);
        clearInterval(progressInterval);
        progressInterval = setInterval(prog, interval / 10);
    };

    $: {
        if (paused) {
            clearInterval(updateInterval);
        } else {
            clearInterval(updateInterval);
            updateInterval = setInterval(incr, interval);
            progress = interval / 10;
        }
    }
    $: {
        if (paused) {
            clearInterval(progressInterval);
            progress = interval / 10;
        } else {
            clearInterval(progressInterval);
            progressInterval = setInterval(prog, interval / 10);
        }
    }
</script>

<section
    on:mousedown={onMouseDown}
    style="left: {left}px; top: {top}px; right: {right}px; bottom: {bottom}px;"
    class="draggable 2xl:absolute w-fit h-fit"
    class:transition-all={!moving}
>
    <div
        bind:clientHeight={h}
        bind:clientWidth={w}
        class="absolute bottom-0 2xl:bottom-4 flex flex-col px-auto 2xl:ml-4 bg-base-200 p-4 md:p-8 rounded-lg rounded-b-none 2xl:rounded-b-lg w-full 2xl:min-w-max shadow-base-300 shadow-xl border-t-4 2xl:border-4 border-base-300"
    >
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
                <div class="flex flex-col space-y-4">
                    <div class="flex flex-row space-x-4">
                        <div class="flex flex-col text-center w-28">
                            <span class="text-base font-bold">
                                Updates: {updates}
                            </span>
                            <span class="text-xs uppercase">
                                Updates every {interval / 1000}s
                            </span>
                        </div>
                        <button
                            on:click={incInterval}
                            class:disabled={interval >= 10000}
                        >
                            <img
                                class="w-6 h-6 opacity-50"
                                alt="slow down data transfer"
                                src={rewind}
                            />
                        </button>
                        <button
                            on:click={decInterval}
                            class:disabled={interval <= 1000}
                        >
                            <img
                                class="w-6 h-6 opacity-50"
                                alt="speed up data transfer"
                                src={fastforward}
                            />
                        </button>
                    </div>
                </div>
                <div class="flex flex-row space-x-4">
                    <div class="flex flex-col text-center w-28">
                        <span class="text-xs uppercase"> Group emitting: </span>
                        <span class="text-base font-bold">
                            Group {group}
                        </span>
                    </div>
                    <button
                        on:click={() => {
                            decGroup();
                            resetProg();
                        }}
                        class:disabled={group <= 1}
                    >
                        <img
                            class="w-6 h-6 opacity-50"
                            alt="increase selected group"
                            src={subtract}
                        />
                    </button>
                    <button
                        on:click={() => {
                            incGroup();
                            resetProg();
                        }}
                        class:disabled={group >= groupLimit}
                    >
                        <img
                            class="w-6 h-6 opacity-50"
                            alt="decrease selected group"
                            src={add}
                        />
                    </button>
                </div>
                <div class="flex flex-row space-x-4">
                    <div class="flex flex-col text-center w-16">
                        <span class="text-xs uppercase"> Grid Size: </span>
                        <span class="text-base font-bold">
                            {grid - 1}px
                        </span>
                    </div>
                    <button
                        on:click={() => {
                            decGrid();
                        }}
                        class:disabled={grid <= 1}
                    >
                        <img
                            class="w-6 h-6 opacity-50"
                            alt="increase grid size"
                            src={subtract}
                        />
                    </button>
                    <button
                        on:click={() => {
                            incGrid();
                        }}
                        class:disabled={grid >= 60}
                    >
                        <img
                            class="w-6 h-6 opacity-50"
                            alt="decrease grid size"
                            src={add}
                        />
                    </button>
                </div>
            </div>

            <progress value={progress} max={interval} />
        {/if}
    </div>
</section>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
/>

<style lang="postcss">
    .draggable {
        @apply select-none cursor-move;
    }
    button:not(.collapse) {
        @apply btn btn-primary;
    }
    button.collapse {
        @apply bg-primary p-2 rounded-full mx-auto mb-4 md:mb-8 2xl:hidden 2xl:mb-0 2xl:p-0;
    }
    /* button.collapse svg {
        @apply stroke-neutral;
    } */
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

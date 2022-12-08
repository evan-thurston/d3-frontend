<script>
    import { onMount } from "svelte";

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
                    <button on:click={toggle}>toggle physics</button>
                    <button on:click={pauseUpdates(!paused)}>
                        {#if paused}
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
                                    d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                                />
                            </svg>
                        </button>
                        <button
                            on:click={decInterval}
                            class:disabled={interval <= 1000}
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
                                    d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                                />
                            </svg>
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
                                d="M19.5 12h-15"
                            />
                        </svg>
                    </button>
                    <button
                        on:click={() => {
                            incGroup();
                            resetProg();
                        }}
                        class:disabled={group >= groupLimit}
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-row space-x-4">
                    <div class="flex flex-col text-center w-16">
                        <span class="text-xs uppercase"> Grid Size: </span>
                        <span class="text-base font-bold">
                            {grid-1}px
                        </span>
                    </div>
                    <button
                        on:click={() => {
                            decGrid();
                        }}
                        class:disabled={grid <= 1}
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
                                d="M19.5 12h-15"
                            />
                        </svg>
                    </button>
                    <button
                        on:click={() => {
                            incGrid();
                        }}
                        class:disabled={grid >= 60}
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
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
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
        @apply w-min bg-primary p-2 rounded-full mx-auto mb-4 md:mb-8 2xl:hidden 2xl:mb-0 2xl:p-0;
    }
    button.collapse svg {
        @apply stroke-neutral;
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

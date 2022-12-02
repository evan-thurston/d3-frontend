<script>
    export let reset, toggle, jsonEdit, swapData;

    let updateInterval, progressInterval;
    let updates = 0;
    let interval = 1000;
    let progress = 100;
    let panelShowing = true;

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
        clearInterval(updateInterval);
        updateInterval = setInterval(incr, interval);
        progress = interval / 10;
    }
    $: {
        clearInterval(progressInterval);
        progressInterval = setInterval(prog, interval / 10);
    }
</script>

<div
    class="absolute bottom-0 2xl:bottom-4 flex flex-col px-auto 2xl:ml-4 bg-violet-900 p-4 md:p-8 rounded-lg w-full 2xl:w-auto"
>
    <button
        on:click={() => (panelShowing = !panelShowing)}
        class="w-min bg-primary p-2 rounded-full mx-auto mb-4 md:mb-8 2xl:hidden 2xl:mb-0 2xl:p-0"
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
        <div
            class="flex flex-col md:flex-row space-x-4 2xl:space-x-0 space-y-4 md:space-y-0 items-center justify-center mb-4"
        >
            <div class="flex flex-row space-x-4 2xl:space-x-0 2xl:mr-4">
                <button
                    on:click={() => {
                        reset();
                        resetProg();
                    }}
                    class="btn btn-primary 2xl:mr-4"
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
                <button on:click={toggle} class="btn btn-primary"
                    >toggle physics</button
                >
            </div>
            <div class="flex flex-row space-x-4 2xl:space-x-0">
                <button on:click={jsonEdit} class="btn btn-primary 2xl:mr-4"
                    >JSON Editor</button
                >
                <button
                    on:click={() => {
                        swapData();
                        resetProg();
                    }}
                    class="btn btn-primary">Swap Dataset</button
                >
            </div>
        </div>
        <div
            class="flex flex-col md:flex-row space-x-4 space-y-4 md:space-y-0 items-center justify-center"
        >
            <!-- <span>
                Updates every {interval / 1000} second{interval > 1000 ? 's' : ''}
            </span> -->
            <div class="flex flex-row space-x-4">
                <div class="flex flex-col text-center w-28">
                    <!-- <span class="indicator-item indicator-center indicator-bottom badge badge-primary rounded-md top-4">{interval/1000}s</span>  -->
                    <span class="text-base font-bold">
                        Updates: {updates}
                    </span>
                    <span class="text-xs">
                        UPDATES EVERY {interval / 1000}S
                    </span>
                </div>
                <button
                    on:click={() => (interval += 1000)}
                    class="btn btn-primary"
                    class:btn-disabled={interval >= 10000}
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
                    on:click={() => (interval -= 1000)}
                    class="btn btn-primary"
                    class:btn-disabled={interval <= 1000}
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
            <progress
                class="progress w-56 my-4"
                value={progress}
                max={interval}
            />
        </div>
    {/if}
</div>

<style lang='postcss'>
    .noMb {
        @apply mb-0 md:mb-0;
    }
</style>
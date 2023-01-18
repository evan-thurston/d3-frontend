<script>
    import { onMount } from "svelte";

    import Histogram from "./Histogram.svelte";
    import ObjectDisplay from "./ObjectDisplay.svelte";
    import Scatterplot from "./Scatterplot.svelte";

    export let point, color, interval, updatesPaused, targeted, focusSvg, deleteNode;

    let height,
        width,
        modalPaused = updatesPaused || false,
        modalOpen = point.modalOpened,
        pause = "/pause.svg",
        play = "/play.svg",
        close = "/close.svg";

    $: graphWidth = (width + height) ** 0.65 || 300;
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

{#if modalOpen}
    <div
        class="container"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div class="bg" />

        <div class="wrapper">
            <div class="modalContainer">
                <div class="modalWrapper">
                    <div class="modalActions">
                        <button
                            class="btn-primary rounded-md p-2 ml-4"
                            on:click={() => {
                                point.modalOpened = false;
                                modalOpen = false;
                                focusSvg();
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <button
                            class="btn-primary rounded-md p-2 ml-4"
                            on:click={() => (modalPaused = !modalPaused)}
                        >
                            {#if modalPaused}
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
                        <button
                            class="btn-primary rounded-md p-2"
                            on:click={deleteNode(point.id)}
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="modalBody">
                        <div class="modalGraphs justify-between">
                            <div>
                                <pre>{"{"}</pre>
                                <ObjectDisplay {point} {color} {targeted} />
                                <pre>{"}"}</pre>
                            </div>
                            <div>
                                {#each [1, 2, 3] as graph}
                                    <div>
                                        {#if graph === 1}
                                            <p>Input Queue</p>
                                        {:else if graph === 2}
                                            <p>Processing Queue</p>
                                        {:else}
                                            <p>Output Queue</p>
                                        {/if}
                                        <Histogram
                                            width={graphWidth}
                                            height={graphWidth * 0.5}
                                            {interval}
                                            {targeted}
                                            {modalPaused}
                                            {updatesPaused}
                                        />
                                    </div>
                                {/each}
                            </div>

                            <div>
                                {#each [1, 2, 3] as graph}
                                    <div>
                                        {#if graph === 1}
                                            <p>Input Queue</p>
                                        {:else if graph === 2}
                                            <p>Processing Queue</p>
                                        {:else}
                                            <p>Output Queue</p>
                                        {/if}
                                        <Scatterplot
                                            width={graphWidth}
                                            height={graphWidth * 0.5}
                                            {interval}
                                            {targeted}
                                            {modalPaused}
                                            {updatesPaused}
                                        />
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
    .container {
        @apply relative z-10;
    }
    .container .bg {
        @apply fixed inset-0 bg-base-100 bg-opacity-75 transition-opacity;
    }
    .container .wrapper {
        @apply fixed inset-0 z-10 overflow-y-auto;
    }
    .container .wrapper .modalContainer {
        @apply flex min-h-full items-center justify-center p-4 text-center sm:p-0;
    }
    .container .wrapper .modalContainer .modalWrapper {
        @apply relative overflow-hidden 
        sm:w-full sm:max-w-max bg-base-100 
        rounded-lg border-8 border-accent shadow-xl  
        text-left sm:my-8 py-4 bottom-8;
    }
    .container .wrapper .modalContainer .modalWrapper .modalBody {
        @apply bg-base-100 p-4 pt-2 sm:py-4 sm:px-6;
    }
    .container .wrapper .modalContainer .modalWrapper .modalBody > div {
        @apply flex flex-row;
    }
    .container
        .wrapper
        .modalContainer
        .modalWrapper
        .modalBody
        > div.modalGraphs {
        @apply space-x-4 sm:space-x-6 lg:space-x-8 mt-2;
    }
    .container
        .wrapper
        .modalContainer
        .modalWrapper
        .modalBody
        > div.modalGraphs
        > div
        > div {
        @apply flex flex-col space-y-4 items-center text-center uppercase;
    }
    .container .wrapper .modalContainer .modalWrapper .modalActions {
        @apply bg-base-100 px-4 sm:flex sm:flex-row-reverse sm:px-6;
    }
</style>

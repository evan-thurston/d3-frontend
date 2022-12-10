<script>
    import { onMount } from "svelte";

    import Histogram from "./Histogram.svelte";
    import ObjectDisplay from "./ObjectDisplay.svelte";
    import Scatterplot from "./Scatterplot.svelte";

    export let point, color, interval, paused, targeted;

    let height,
        width,
        pause = "/pause.svg",
        play = "/play.svg",
        modalPaused = paused || false;

    let modalOpen = point.modalOpened,
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
                            }}
                        >
                            <img
                                src={close}
                                alt="close modal"
                                class="w-6 h-6 opacity-50"
                            />
                        </button>
                        <button
                            class="btn-primary rounded-md p-2"
                            on:click={() => (modalPaused = !modalPaused)}
                        >
                            {#if modalPaused}
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
                                            {paused}
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
                                            {paused}
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
        sm:w-full sm:max-w-max bg-base-200 
        rounded-lg border-8 border-base-300 shadow-xl  
        text-left sm:my-8 py-4 bottom-8;
    }
    .container .wrapper .modalContainer .modalWrapper .modalBody {
        @apply bg-base-200 p-4 pt-2 sm:py-4 sm:px-6;
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
        @apply bg-base-200 px-4 sm:flex sm:flex-row-reverse sm:px-6;
    }
</style>

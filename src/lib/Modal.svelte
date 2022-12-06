<script>
    import { onMount } from "svelte";

    import Histogram from "./Histogram.svelte";
    import Scatterplot from "./Scatterplot.svelte";

    export let point, color, interval, paused, targeted;

    let height, width;

    let modalOpen = point.modalOpened;

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
                    <div class="modalBody">
                        <div
                            class={point.data
                                ? "justify-between"
                                : "justify-center 2xl:justify-between"}
                        >
                            <div>
                                <pre>{"{"}</pre>
                                <div class="ml-4">
                                    <h3
                                        class="text-lg font-medium leading-6"
                                        id="modal-title"
                                    >
                                        ID: {point.id}
                                    </h3>
                                    <p class="text-sm">
                                        group: {point.group}
                                    </p>
                                    <p class="text-sm">
                                        icon: {point.group > 2 ? "dog" : "bird"}
                                    </p>
                                    <p class="text-sm">
                                        color: {color}
                                    </p>
                                    <p class="text-sm">
                                        targeted: {targeted || false}
                                    </p>
                                </div>
                                <pre>{"}"}</pre>
                            </div>
                            {#if point.data}
                                <div class="text-right">
                                    {#each point.data as field, i}
                                        <p
                                            class={typeof field.value ===
                                            "string"
                                                ? "text-success"
                                                : typeof field.value ===
                                                  "number"
                                                ? "text-warning"
                                                : "text-error"}
                                        >
                                            {field.label}: {field.value}
                                        </p>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                        <div class="modalGraphs justify-between">
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
                                            {paused}
                                        />
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                    <div class="modalActions">
                        <button
                            class="btn btn-primary"
                            on:click={() => {
                                point.modalOpened = false;
                                modalOpen = false;
                            }}>Close</button
                        >
                        <!-- <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >Save</button
                    > -->
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
        > div {
        @apply uppercase;
    }
    .container
        .wrapper
        .modalContainer
        .modalWrapper
        .modalBody
        > div.modalGraphs
        > div
        > div {
        @apply flex flex-col space-y-4 items-center text-center;
    }
    .container .wrapper .modalContainer .modalWrapper .modalActions {
        @apply bg-base-200 px-4 pb-2 sm:flex sm:flex-row-reverse sm:px-6;
    }
</style>

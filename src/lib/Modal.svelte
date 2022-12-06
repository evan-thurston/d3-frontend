<script>
    import { onMount } from "svelte";

    import Histogram from "./Histogram.svelte";
    import Scatterplot from "./Scatterplot.svelte";

    export let point, color, interval, paused, targeted;

    let height, width;

    let modalOpen = point.modalOpened;

    $: graphWidth = (width + height) ** 0.7 || 300;
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

{#if modalOpen}
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />

        <div class="fixed inset-0 z-10 overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
            >
                <div
                    class="relative transform overflow-hidden rounded-lg bg-base-200 border-8 border-base-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-max pr-12 py-4"
                >
                    <div class="bg-base-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                            <div
                                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[{color}] bg-opacity-10 sm:mx-0 sm:h-10 sm:w-10"
                            >
                                <!-- Heroicon name: outline/hashtag -->
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={color}
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                                    />
                                </svg>
                            </div>
                            <div
                                class="mt-3 text-center sm:mt-2 sm:ml-4 sm:text-left"
                            >
                                <div class="flex flex-row justify-between">
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
                                                icon: {point.group > 2
                                                    ? "dog"
                                                    : "bird"}
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
                                        <div>
                                            {#each point.data as field, i}
                                                <p
                                                    style="color: {typeof field.value ===
                                                    'string'
                                                        ? '#1C8747'
                                                        : typeof field.value ===
                                                          'number'
                                                        ? '#FAAF2E'
                                                        : '#6654b7'}"
                                                >
                                                    {field.label}: {field.value}
                                                </p>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                                <div class="flex flex-row space-x-8 mt-2">
                                    <div class="lowercase">
                                        {#each [1, 2, 3] as graph}
                                            {#if graph === 1}
                                                Input Queue
                                            {:else if graph === 2}
                                                Processing Queue
                                            {/if}
                                            {#if graph === 3}
                                                Output Queue
                                                <Histogram
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                    fixed={true}
                                                />
                                                <Scatterplot
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                />
                                            {:else if point.group % 2 === 1}
                                                <Scatterplot
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                />
                                            {:else}
                                                <Histogram
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                />
                                            {/if}
                                        {/each}
                                    </div>

                                    <div class="uppercase">
                                        {#each [1, 2, 3] as graph}
                                            {#if graph === 1}
                                                Input Queue
                                            {:else if graph === 2}
                                                Processing Queue
                                            {/if}
                                            {#if graph === 3}
                                                Output Queue
                                                <Histogram
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                    fixed={true}
                                                />
                                                <Scatterplot
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                />
                                            {:else if point.group % 2 === 1}
                                                <Scatterplot
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                />
                                            {:else}
                                                <Histogram
                                                    width={graphWidth}
                                                    height={(graphWidth * 2) /
                                                        3}
                                                    {interval}
                                                    {targeted}
                                                    {paused}
                                                />
                                            {/if}
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="bg-base-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                    >
                        <button
                            type="button"
                            class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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

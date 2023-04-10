<script>
    import Highlight from '../Highlight.svelte';
    import OutEditor from '$lib/selector/OutEditor.svelte';
    import Histogram from './Histogram.svelte';
    import ModalRow from './ModalRow.svelte';

    export let node;

    let width,
        height,
        keys = Object.keys(node),
        ignoredKeys = new Set([
            'index',
            'id',
            'data',
            'selected',
            'x',
            'y',
            'vx',
            'vy',
            'fx',
            'fy',
        ]);

    keys = keys.filter((val) => !ignoredKeys.has(val));

    $: graphWidth = (width + height) ** 0.675 || 300;
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
/>

<div class="wrapper">
    <div class="flex flex-col w-full">
        <ModalRow
            field="id"
            bind:value={node.id}
            id={true}
        />

        {#each keys as field}
            <ModalRow
                {field}
                bind:value={node[field]}
            />
        {/each}

        <OutEditor bind:out={node.out} />

        <!-- {#if node.data}
            <p class="text-lg">
                data: [
                {#each node.data as row}
                    <p class="ml-4 text-sm">
                        {row.label}: <Highlight value={row.value}>
                            {row.value}
                        </Highlight>
                    </p>
                {/each}
                ]
            </p>
        {/if} -->

        <!-- {#each ['x', 'y'] as coord}
            <p class="text-lg">
                {coord}:
                <Highlight value={Math.round(node[coord])}>
                    {Math.round(node[coord])}
                </Highlight>
            </p>
        {/each} -->
    </div>
    <div>
        {#each [1, 2] as graph}
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
                    interval={1800}
                    targeted={true}
                    modalPaused={false}
                    updatesPaused={false}
                />
            </div>
        {/each}
    </div>
</div>

<style lang="postcss">
    .wrapper {
        @apply px-8 py-4
        bg-base-200 rounded-xl 
        grid grid-cols-2 gap-8;
    }
</style>

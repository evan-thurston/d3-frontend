<script>
    import Highlight from "../Highlight.svelte";
    import Histogram from "$lib/modal/Histogram.svelte";
    import Scatterplot from "$lib/modal/Scatterplot.svelte";

    export let node, fields, selectNode;

    let width,
        height,
        objectArr = [],
        keys = Object.keys(node),
        ignoredKeys = new Set(["vx", "vy", "fx", "fy"]),
        coords = new Set(["x", "y"]);

    if (!fields) fields = keys;

    keys = Object.keys(node);
    for (let i = 0; i < keys.length; i++) {
        if (fields.includes(keys[i]) && !ignoredKeys.has(keys[i]))
            objectArr.push({
                label: keys[i],
                value: coords.has(keys[i])
                    ? Math.round(node[keys[i]])
                    : node[keys[i]],
            });
        if (keys[i] === "group" && fields.includes("icon")) {
            objectArr.push({
                label: "icon",
                value: node.group > 2 ? "dog" : "bird",
            });
        }
    }

    $: graphWidth = (width + height) ** 0.65 || 300;
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<button on:click={selectNode(node.id)} class="relative left-[85%] top-7 w-12 h-12 btn btn-primary">
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
<div class="wrapper">
    <div>
        {#each objectArr as field}
            <p
                class={field.label === "id"
                    ? "text-3xl uppercase font-medium"
                    : "text-lg"}
            >
                {field.label}:
                <Highlight value={field.value}>
                    {typeof field.value === "object" ? "[" : ""}
                    {#if field.label === "out" && typeof field.value[0] === "string"}
                        {#each field.value as out}
                            <p><Highlight value={out}>{out}</Highlight></p>
                        {/each}
                    {:else}
                        {field.label === "data" ? "" : field.value}
                    {/if}
                    {typeof field.value === "object" ? "]" : ""}
                </Highlight>
            </p>

            {#if field.label === "data"}
                <div class="ml-4">
                    {#each field.value as obj}
                        <p class="text-sm">
                            {obj.label}:
                            <Highlight value={obj.value}>
                                {obj.value}
                            </Highlight>
                        </p>
                    {/each}
                </div>
            {/if}
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
        @apply px-6 py-4 mx-6 -mt-8
        border-4 border-primary rounded-xl 
        grid grid-cols-3;
    }
</style>

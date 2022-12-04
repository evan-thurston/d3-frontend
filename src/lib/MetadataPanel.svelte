<script>
    import Histogram from "./../lib/Histogram.svelte";
    import Scatterplot from "./Scatterplot.svelte";

    export let point,
        radius,
        transform,
        nodeHovered,
        color,
        interval,
        data,
        group,
        paused;

    let height, width, targeted;

    let targetingLinks = data.links.filter(({ target }) => target === point.id);
    targetingLinks.forEach((link) => {
        if (data.nodes.find(({ id }) => id === link.source).group === group) {
            targeted = true;
        }
    });

    $: popupWidth = (width + height) ** 0.65 || 200;
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<foreignObject
    height={point.currentView !== 0 && point.currentView
        ? popupWidth * 2
        : (popupWidth * 1) / 2}
    width={popupWidth}
    x={point.x - popupWidth / 2 || point.x}
    y={point.y + radius * 1.5 || point.y}
    transform="translate({transform.x || 0} {transform.y ||
        0}) scale({transform.k} {transform.k})"
    class:showing={nodeHovered === point.id}
>
    {#if point.currentView === 1}
        {#each [1, 2, 3] as graph}
            {#if graph === 3}
                <Scatterplot
                    width={popupWidth - 20}
                    height={(popupWidth * 2) / 3 - 12}
                    {interval}
                    {targeted}
                    {color}
                    {paused}
                    fixed={true}
                />
                <Histogram
                    width={popupWidth - 20}
                    height={(popupWidth * 2) / 3 - 12}
                    {interval}
                    {targeted}
                    {color}
                    {paused}
                />
            {:else if point.group % 2 === 1}
                <Scatterplot
                    width={popupWidth - 20}
                    height={(popupWidth * 2) / 3 - 12}
                    {interval}
                    {targeted}
                    {color}
                    {paused}
                />
            {:else}
                <Histogram
                    width={popupWidth - 20}
                    height={(popupWidth * 2) / 3 - 12}
                    {interval}
                    {targeted}
                    {color}
                    {paused}
                />
            {/if}
        {/each}
    {:else if point.currentView === 2}
        {#each [2, 3, 4] as graph}
            <Histogram
                width={popupWidth - 20}
                height={(popupWidth * 2) / 3 - 12}
                {interval}
                {targeted}
                {color}
                {paused}
                fixed={true}
            />
            <Scatterplot
                width={popupWidth - 20}
                height={(popupWidth * 2) / 3 - 12}
                {interval}
                {targeted}
                {color}
                {paused}
            />
        {/each}
    {:else}
        <p>
            ID: {point.id}
        </p>
        <p>
            group: {point.group}
        </p>
        <p>icon: {point.group > 2 ? "dog" : "bird"}</p>
    {/if}
</foreignObject>

<style lang="postcss">
    foreignObject {
        @apply bg-slate-200 p-2
        border-2 border-slate-600 rounded-lg 
        text-center text-slate-600
        opacity-0 invisible 
        transition-opacity duration-300 ease-in-out
        flex flex-col;
    }
    foreignObject.showing {
        @apply opacity-100 visible;
    }
    foreignObject p {
        @apply text-xs md:text-sm 2xl:text-base;
    }
    foreignObject div {
        @apply absolute;
    }
</style>

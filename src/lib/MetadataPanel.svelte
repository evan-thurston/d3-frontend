<script>
    import Histogram from "./../lib/Histogram.svelte";

    export let point, radius, transform, nodeHovered, color;

    var data1 = [30, 86, 168, 281, 303, 365];
    var data2 = [30, 86, 130, 168, 281, 303, 365, 475];
    var data3 = [30, 86, 168, 281];
    var data4 = [30, 86, 130, 150, 168, 281, 336, 387, 485, 497];

    let height, width;

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
        <Histogram
            data={data1}
            width={popupWidth - 20}
            height={(popupWidth * 2) / 3 - 12}
            {color}
        />
        <Histogram
            data={data2}
            width={popupWidth - 20}
            height={(popupWidth * 2) / 3 - 12}
            {color}
        />
        <Histogram
            data={data3}
            width={popupWidth - 20}
            height={(popupWidth * 2) / 3 - 12}
            {color}
        />
    {:else if point.currentView === 2}
        <Histogram
            data={data3}
            width={popupWidth - 20}
            height={(popupWidth * 2) / 3 - 12}
            {color}
        />
        <Histogram
            data={data1}
            width={popupWidth - 20}
            height={(popupWidth * 2) / 3 - 12}
            {color}
        />
        <Histogram
            data={data4}
            width={popupWidth - 20}
            height={(popupWidth * 2) / 3 - 12}
            {color}
        />
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
        transition-opacity duration-300 ease-in-out;
    }
    foreignObject.showing {
        @apply opacity-100 visible;
    }
    foreignObject p {
        @apply text-xs md:text-sm 2xl:text-base;
    }
</style>

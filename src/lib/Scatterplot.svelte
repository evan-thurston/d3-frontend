<script>
    import * as d3 from "d3";

    let data = [],
        buffer = 10,
        dataInterval;

    export let height = 300,
        width = 300,
        fixed = false,
        interval,
        targeted,
        paused;

    $: radius = ((width + height) ** 0.4 * 1.5) / data.length ** 0.5;

    $: {
        if (!targeted || paused) {
            clearInterval(dataInterval);
        } else {
            clearInterval(dataInterval);
            dataInterval = setInterval(generateData, interval);
        }
    }

    for (let i = 0; i < 30; i++) {
        data.push({
            x: Math.round(Math.random() * 100),
            y: Math.round(Math.random() * 100),
        });
    }

    const generateData = () => {
        data = [];
        for (let i = 0; i < 30; i++) {
            data.push({
                x: Math.round(Math.random() * 100),
                y: Math.round(Math.random() * 100),
            });
        }
    };

    $: yScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([height - buffer, buffer]);

    $: xScale = d3
        .scaleLinear()
        .domain([0, 100])
        .range([buffer, width - buffer]);
</script>

<svg class="opacity-75 my-1 sm:my-2 lg:my-4" class:fixed {width} {height}>
    {#each data as num}
        <circle r={radius} cx={xScale(num.x) || 0} cy={yScale(num.y) || 0} />
    {/each}
</svg>

<style lang="postcss">
    circle {
        @apply fill-secondary;
    }
</style>

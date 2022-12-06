<script>
    import * as d3 from "d3";

    let data = [],
        buffer = 15,
        dataInterval;

    export let height = 300,
        width = 300,
        // color = "green",
        fixed = false,
        interval,
        targeted,
        paused;

    $: radius = ((width + height) ** 0.5 * 1.5) / data.length ** 0.5;

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

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.y))
        .range([height - buffer, buffer]);
        
    const xScale = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.x))
        .range([buffer, width - buffer]);
</script>

<svg class="opacity-75" class:fixed {width} {height}>
    {#key data}
        {#each data as num}
            <circle
                r={radius}
                cx={xScale(num.x) || 0}
                cy={yScale(num.y) || 0}
            />
        {/each}
    {/key}
</svg>

<style lang='postcss'>
    circle {
        @apply fill-primary;
    }
</style>
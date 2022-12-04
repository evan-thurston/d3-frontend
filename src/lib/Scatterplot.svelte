<script>
	import * as d3 from "d3";

	let data = [];
	export let height = 300;
	export let width = 300;
	export let color = "green";
    let buffer = 10;

    for(let i=0;i<30;i++) {
        data.push({
            x: Math.round(Math.random() * 100),
            y: Math.round(Math.random() * 100)
        })
    }

	const yScale = d3
		.scaleLinear()
		.domain(d3.extent(data, d => d.y))
		.range([height - buffer, buffer]);
    const xScale = d3
		.scaleLinear()
		.domain(d3.extent(data, d => d.x))
		.range([buffer, width - buffer]);
</script>

<svg class="chart" {width} {height}>
	{#each data as num}
		<!-- <div
			class="col"
			style="height: {yScale(num)}px; width: {width / data.length -
				2}px; background-color: {color}"
		>
			<p>
				{num}
			</p>
		</div> -->
        <circle r=5 fill={color} cx={xScale(num.x)} cy={yScale(num.y)} />
	{/each}
</svg>

<style lang="postcss">
	.chart {
		@apply mb-2;
	}
	.chart .col {
		@apply p-1 pt-0 mx-[1px] align-bottom inline-block
            font-sans text-center text-slate-600;
	}
	.chart .col p {
		@apply text-[0.5rem] lg:text-xs 2xl:text-sm;
	}
</style>

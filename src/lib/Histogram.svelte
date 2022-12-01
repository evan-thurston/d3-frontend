<script lang='ts'>
    import { onMount } from 'svelte';
	import * as d3 from 'd3';

    export let data: number[];
    export let height: number = 300;
    export let width: number = 300;
	
	let el: HTMLDivElement;

    const yScale = d3.scaleLinear()
        .domain([0, Math.max(...data)])
        .range([9, height])

	onMount(() => {
		d3.select(el)
			.selectAll("div")
			.data(data)
			.enter()
			.append("div")
			.style("height", (d: number) => {
				return yScale(d) + "px";
			})
			.style("width", (d: number) => {
				return (width / data.length) - 2 + "px";
			})
			.text((d: number) => {
				return d;
			});
	});
</script>

<style lang='postcss'>
	.chart :global(div) {
        @apply
            bg-emerald-600 p-1 pt-0 mx-[1px] align-bottom inline-block
            font-sans text-xs text-center text-white;
	}
	.chart {
		@apply mb-2;
	}
</style>

<div bind:this={el} class="chart"></div>
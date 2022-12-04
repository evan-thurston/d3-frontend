<script>
	import * as d3 from "d3";

	export let data;
	export let height = 300;
	export let width = 300;
	export let color = "green";

	const yScale = d3
		.scaleLinear()
		.domain([0, Math.max(...data)])
		.range([9, height]);
</script>

<div class="chart">
	{#each data as num}
		<div
			class="col"
			style="height: {yScale(num)}px; width: {width / data.length -
				2}px; background-color: {color}"
		>
			<p>
				{num}
			</p>
		</div>
	{/each}
</div>

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

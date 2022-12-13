<script>
	import * as d3 from "d3";

	export let height,
		width,
		interval,
		targeted,
		fixed = false,
		buffer = 30,
		paused,
		modalPaused;

	let data = [],
		dataInterval;

	for (let i = 0; i < 6; i++) {
		data.push(Math.round(Math.random() * 100));
	}

	const generateData = () => {
		data = [];
		for (let i = 0; i < 6; i++) {
			data.push(Math.round(Math.random() * 100));
		}
	};

	$: {
		if (!targeted || paused || modalPaused) {
			clearInterval(dataInterval);
		} else {
			clearInterval(dataInterval);
			dataInterval = setInterval(generateData, interval);
		}
	}

	$: yScale = d3
		.scaleLinear()
		.domain([0, Math.max(...data)])
		.range([buffer, height]);
</script>

<div class:fixed class="chart" style="width: {width}px; height: {height}px">
	{#each data as num}
		<div
			class="col"
			style="width: {width / data.length}px; height: {yScale(num)}px"
		>
			<p>
				{num}
			</p>
		</div>
	{/each}
</div>

<style lang="postcss">
	.chart {
		@apply flex flex-row opacity-75 my-1 sm:my-2 lg:my-4;
	}
	.chart .col {
		@apply sm:p-1 pt-0 mx-[1px] self-end bg-primary
            font-sans text-center rounded-md;
	}
	.chart .col p {
		@apply text-[0.3rem] sm:text-[0.4rem] md:text-[0.6rem] lg:text-xs 2xl:text-sm;
	}
</style>

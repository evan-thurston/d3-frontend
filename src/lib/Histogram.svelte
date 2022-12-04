<script>
	import * as d3 from "d3";

	let data = [];
	export let height = 300;
	export let width = 300;
	export let color = "green";
    export let interval, targeted, fixed = false, paused;
    let dataInterval;

	$: {
		if (!targeted || paused) {
			clearInterval(dataInterval);
		} else {
			clearInterval(dataInterval);
			dataInterval = setInterval(generateData, interval);
		}
	}

	for(let i=0;i<6;i++) {
        data.push(Math.round(Math.random() * 100))
    }

    const generateData = () => {
        data = [];
        for(let i=0;i<6;i++) {
			data.push(Math.round(Math.random() * 100))
		}
    };

	const yScale = d3
		.scaleLinear()
		.domain([0, Math.max(...data)])
		.range([25, height - 35]);
	
	// TODO: algorithm to smooth out histogram
	// const numBefore = (num) => {
	// 	if(data.indexOf(num) === 0) return
	// 	else return data[data.indexOf(num) - 1]
	// }

	// const numAfter = (num) => {
	// 	if(data.indexOf(num) === data.length-2) return
	// 	else return data[data.indexOf(num) +1]
	// }

	// const avg = (num) => {
	// 	return Math.round((numBefore(num) + num + numAfter(num)) / 3)
	// }
</script>

<div class:fixed class="chart" style="height: {height}px">
	{#each data as num}
		<div
			class="col"
			style="height: {yScale(num)}px; width: {width / data.length -
				3}px; background-color: {color}"
		>
			<p>
				{num}
			</p>
		</div>
	{/each}
</div>

<style lang="postcss">
	.chart {
		@apply mb-2 flex flex-row opacity-75;
	}
	.chart .col {
		@apply sm:p-1 pt-0 mx-[1px] self-end
            font-sans text-center text-slate-600;
	}
	.chart .col p {
		@apply text-[0.3rem] sm:text-[0.4rem] md:text-[0.6rem] lg:text-xs 2xl:text-sm;
	}
</style>

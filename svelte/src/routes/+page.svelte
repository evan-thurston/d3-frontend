<script>
// @ts-nocheck

    import NetworkGraph from "$lib/NetworkGraph.svelte";
    import ForceWrapper from "./../lib/ForceWrapper.svelte";
    import Histogram from "./../lib/Histogram.svelte";

    import * as d3 from "d3";
    import { onMount } from "svelte";
    import OldGraph from "$lib/OldGraph.svelte";

    let width, height = 1000;

	var data1 = [30, 86, 168, 281, 303, 365];
	var data2 = [30, 86, 130, 168, 281, 303, 365, 475];
	var data3 = [30, 86, 168, 281];
	var data4 = [30, 86, 130, 150, 168, 281, 336, 387, 485, 497];

    let demo = 1;

	import { lesMis, dummyNodes } from './../lib/utils'
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
/>

<!-- {#if demo === 1} -->
    <NetworkGraph data={dummyNodes}/>
<!-- {/if}
{#if demo === 2}
    <ForceWrapper/>
{/if}
{#if demo === 3}
<div class='border-2 border-white p-8 rounded-md w-[800px] h-[800px]'>
<div class='flex flex-row space-x-7'>
    <Histogram data={data1} width='160' height=736/>
    <Histogram data={data2} width='160' height=736/>
    <Histogram data={data3} width='160' height=736/>
    <Histogram data={data4} width='160' height=736/>
</div>
</div>
{/if}
{#if demo === 4}
	<OldGraph/>
{/if} -->
<!-- <div class="h-5 absolute bottom-1">
    <label>
        <input type="radio" bind:group={demo} value={1} />
        linked graph
    </label>
    <label>
        <input type="radio" bind:group={demo} value={2} />
        force directed nodes
    </label>
    <label>
        <input type="radio" bind:group={demo} value={3} />
        histograms
    </label>
	<label>
        <input type="radio" bind:group={demo} value={4} />
        Original Graph
    </label>
    
</div> -->
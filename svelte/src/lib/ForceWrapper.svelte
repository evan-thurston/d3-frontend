<script>
    // @ts-nocheck
	import * as d3 from 'd3';

    import { onMount } from "svelte";

    import { forceX, forceY, forceCollide, forceRadial, forceCenter, forceManyBody, forceLink } from "d3-force";

    import Force from "./Force.svelte";

    let width, height = 800;

    let radius = 60;

    let element;
    let centerPosition = [400, 400];
    let useForceCollide = true;
    let useForceRadial = true;
    let useForceCharge = true;
    $: activeForceX = forceX().x(centerPosition[0]);
    $: activeForceY = forceY().y(centerPosition[1]);
    // $: activeForceCollide = forceCollide().radius(radius/2).iterations(3);
    $: activeForceRadial = forceRadial()
        .radius(radius*6)
        .x(centerPosition[0])
        .y(centerPosition[1]);
    $: activeForceCenter = forceCenter(width/2, height/2)
    $: activeForceCharge = forceManyBody().strength(radius*-9);
    $: activeForceLink = forceLink().id(d => d.id).distance((d, a, b) => {return 3 * (d.source + d.target)})
    $: forces = [
        ["x", activeForceX],
        ["y", activeForceY],
        // ['center', activeForceCenter],
        useForceCharge && ['charge', activeForceCharge],
        // ['link', activeForceLink],
        // useForceCollide && ["collide", activeForceCollide],
        useForceRadial && ["radial", activeForceRadial],
    ].filter((d) => d);

    let dots;
    let links = [];
    onMount(() => {
        d3.json('./../data.json')
            .then(res => {
                dots = res.nodes;
                dots.forEach(d => {
                    if(d.connectionsOut) {
                        d.connectionsOut.forEach(out => {
                            links.push({'source': d.id, 'target': out})
                        })
                    }
                })
                console.log(links)
            })
            .catch(() => {
                console.error("Oh no, something horrible happened!")
            })
    });

    const onClick = (e) => {
        if (!element) return;
        const bounds = element.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        centerPosition = [x, y];
    };
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<div class="bg-slate-600 h-9 flex-row justify-between">
    <div class="controls">
        <label>
            <input type="checkbox" bind:checked={useForceCharge} />
            Collide?
        </label>
        <label>
            <input type="checkbox" bind:checked={useForceRadial} />
            Radial?
        </label>
    </div>
    <div class="note">Click around to update</div>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={onClick} bind:this={element}>
    <Force {forces} {dots} {links} nodeRadius={radius} />
</div>

<style lang="postcss">
    .controls {

        font-style: italic;
        color: var(--text-light);
        @apply absolute right-4 top-1
    }
    label + label {
        margin-left: 1em;
    }
    .note {
        font-style: italic;
        color: var(--text-light);
        @apply absolute left-4 top-1
    }
</style>

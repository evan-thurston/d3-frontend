<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import { zoom, zoomIdentity } from "d3-zoom";
    import { schemeAccent } from "d3-scale-chromatic";
    import { select, selectAll } from "d3-selection";
    import { drag } from "d3-drag";
    import {
        forceSimulation,
        forceLink,
        forceManyBody,
        forceCenter,
    } from "d3-force";
    import { link } from "d3";
    let d3 = {
        zoom,
        zoomIdentity,
        scaleLinear,
        scaleOrdinal,
        schemeAccent,
        select,
        selectAll,
        drag,
        forceSimulation,
        forceLink,
        forceManyBody,
        forceCenter,
    };
    export let data;
    let svg;
    let width = 500;
    let height = 600;
    const radius = 20;
    const padding = { top: 20, right: 40, bottom: 40, left: 25 };
    $: links = data.links.map((d) => Object.create(d));
    $: nodes = data.nodes.map((d) => Object.create(d));
    const colourScale = d3.scaleOrdinal(d3.schemeAccent);
    let transform = d3.zoomIdentity;
    let simulation;
    onMount(() => {
        simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3.forceLink(links).id((d) => d.id)
            )
            .force("charge", d3.forceManyBody().strength(radius * -9))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", simulationUpdate);
        d3.select(svg)
            .call(
                d3
                    .drag()
                    .container(svg)
                    .subject(dragsubject)
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
            )
            .call(
                d3
                    .zoom()
                    .scaleExtent([1 / 10, 8])
                    .on("zoom", zoomed)
            );
    });
    function simulationUpdate() {
        simulation.tick();
        nodes = [...nodes];
        links = [...links];

        var linkSelection = d3.select(svg).selectAll("g.link").select('line');
    }
    function zoomed(currentEvent) {
        transform = currentEvent.transform;
        simulationUpdate();
    }
    function dragsubject(currentEvent) {
        const node = simulation.find(
            transform.invertX(currentEvent.x),
            transform.invertY(currentEvent.y),
            radius
        );
        if (node) {
            node.x = transform.applyX(node.x);
            node.y = transform.applyY(node.y);
        }
        return node;
    }
    function dragstarted(currentEvent) {
        if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
        currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
    }
    function dragged(currentEvent) {
        currentEvent.subject.fx = transform.invertX(currentEvent.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.y);
    }
    function dragended(currentEvent) {
        if (!currentEvent.active) simulation.alphaTarget(0);
        currentEvent.subject.fx = null;
        currentEvent.subject.fy = null;
    }
    function resize() {
        ({ width, height } = svg.getBoundingClientRect());
    }
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:resize={resize}
/>

<!-- SVG was here -->
<svg bind:this={svg} {width} height={height-24}>
    {#each links as link}
        <g stroke="#999" stroke-opacity="0.6" class='link'>
            <!-- x2={(link.target.x > link.source.x) ? link.target.x - radius : link.target.x + radius} -->
            <!-- y2={(link.target.y > link.source.y) ? link.target.y - radius : link.target.y + radius} -->
            <line
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                marker-end="url(#SvgjsMarker1019)"
                transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
            >
                <title>{link.source.id}</title>
            </line>
        </g>
        <defs>
            <marker
                markerWidth="15"
                markerHeight="15"
                refX="2.5"
                refY="2.5"
                viewBox="0 0 5 5"
                orient="auto"
                id="SvgjsMarker1019"
            >
                <polygon
                    points="0,5 0,0 5,2.5"
                    fill="hsl(0, 0%, 50%)"
                />
            </marker>
        </defs>
    {/each}

    {#each nodes as point}
        <circle
            class="node"
            r={radius}
            fill={colourScale(point.group)}
            cx={point.x}
            cy={point.y}
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
            <title>{point.id}</title></circle
        >
    {/each}
</svg>

<style>
    svg {
        float: left;
    }
    circle {
        stroke: #fff;
        stroke-width: 1.5;
    }
</style>

<script>
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
    import MetadataPanel from "./MetadataPanel.svelte";
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
    export let data, interval, loaded, group, paused, pauseUpdates;

    // $: intervalSec = interval/1000;
    // console.log(intervalSec)
    let svg;
    let width = 500;
    let height = 600;
    $: radius = ((width + height) ** 0.5 * 2) / data.nodes.length ** 0.5;
    const colourScale = d3.scaleOrdinal(d3.schemeAccent);
    let transform = d3.zoomIdentity;
    let simulation;
    let nodeHovered;

    export let physicsPaused = false;
    let simulationPaused = false;
    onMount(() => {
        startSim();
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
                    .scaleExtent([1/3, 3])
                    .on("zoom", zoomed)
            );
        loaded = true;
    });
    $: links = data.links.map((d) => Object.create(d));
    $: nodes = data.nodes.map((d) => Object.create(d));
    function simulationUpdate() {
        simulation.tick();
        nodes = [...nodes];
        links = [...links];

        if (physicsPaused && !simulationPaused) {
            stopSim();
            simulationPaused = true;
        } else if (!physicsPaused && simulationPaused) {
            startSim();
            simulationPaused = false;
        }
    }

    const pointAlongLink = (link, distance, fromEnd = false) => {
        // Uses linear interpolation to find the point "distance" pixels
        // along the line from link.source to link.target.
        // If fromEnd is true, calculates the point "distance" pixels from the end
        // of the line.
        let totalDist =
            ((link.source.x - link.target.x) ** 2 +
                (link.source.y - link.target.y) ** 2) **
            0.5;
        let ratio;
        if (fromEnd) {
            ratio = (totalDist - distance) / totalDist;
        } else {
            ratio = distance / totalDist;
        }
        let newX = link.source.x + (link.target.x - link.source.x) * ratio;
        let newY = link.source.y + (link.target.y - link.source.y) * ratio;
        return { x: newX, y: newY };
    };

    const startSim = () => {
        simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id((d) => d.id)
                    .distance(
                        (radius * 9) /
                            (Math.max(1, 750 - width) ** 0.1 *
                                nodes.length ** 0.1)
                    )
            )
            .force(
                "charge",
                d3
                    .forceManyBody()
                    .strength(
                        (radius * -60) /
                            (Math.max(1, 750 - width) ** 0.1 *
                                nodes.length ** 0.2)
                    )
            )
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", simulationUpdate);
    };

    const stopSim = () => {
        simulation.stop();
        simulation
            .force("link", null)
            .force("charge", null)
            .force("center", null);
    };

    const zoomed = (currentEvent) => {
        pauseUpdates(true);
        transform = currentEvent.transform;
        simulationUpdate();
    };
    const dragsubject = (currentEvent) => {
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
    };
    const dragstarted = (currentEvent) => {
        if (!currentEvent.active) simulation.alphaTarget(0.3).restart();
        currentEvent.subject.fx = transform.invertX(currentEvent.subject.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.subject.y);
    };
    const dragged = (currentEvent) => {
        currentEvent.subject.fx = transform.invertX(currentEvent.x);
        currentEvent.subject.fy = transform.invertY(currentEvent.y);
    };
    const dragended = (currentEvent) => {
        if (!currentEvent.active) simulation.alphaTarget(0);
        currentEvent.subject.fx = null;
        currentEvent.subject.fy = null;
    };
    const resize = () => {
        ({ width, height } = svg.getBoundingClientRect());
    };
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:resize={resize}
/>

<svg bind:this={svg} {width} {height}>
    {#each links as link}
        <g stroke="#999" stroke-opacity="0.6">
            <line
                x1={pointAlongLink(link, radius).x || 0}
                y1={pointAlongLink(link, radius).y || 0}
                x2={pointAlongLink(link, radius + 10, true).x || 0}
                y2={pointAlongLink(link, radius + 10, true).y || 0}
                marker-end="url(#SvgjsMarker1019)"
                transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
            />
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
                <polygon points="0,5 0,0 5,2.5" fill="hsl(0, 0%, 50%)" />
            </marker>
        </defs>
        {#if !paused}
            {#if link.source.group === group}
                {#key transform}
                    <circle
                        r={radius / 5}
                        fill={colourScale(group)}
                        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
                    >
                        <animateMotion
                            dur={interval / 1000 || 5 + "s"}
                            repeatCount="indefinite"
                            path="M{link.source.x} {link.source.y} L{link.target
                                .x} {link.target.y}"
                            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
                        />
                    </circle>
                {/key}
            {/if}
        {/if}
    {/each}
    <g>
        {#each nodes as point}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <g
                on:click={() => {
                    if (!point.currentView || point.currentView === 0)
                        point.currentView = 1;
                    else if (point.currentView === 1) point.currentView = 2;
                    else point.currentView = 0;
                }}
                on:mouseenter={() => (nodeHovered = point.id)}
                on:mouseleave={() => (nodeHovered = null)}
                class="node"
            >
                <text
                    fill={colourScale(point.group)}
                    x={point.x}
                    y={point.y - radius * 1.2 || point.y}
                    text-anchor="middle"
                    transform="
                        translate({transform.x || 0} {transform.y || 0}) 
                        scale({transform.k} {transform.k})"
                >
                    ID: {point.id}
                </text>

                <circle
                    class="node"
                    r={radius}
                    fill={colourScale(point.group)}
                    cx={point.x}
                    cy={point.y}
                    transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
                />
            </g>
        {/each}
        <g>
            {#each nodes as point}
                <image
                    transform="
                        translate({transform.x || 0} {transform.y || 0}) 
                        scale({transform.k} {transform.k})"
                    width={radius}
                    height={radius}
                    x={point.x - radius / 2 || point.x}
                    y={point.y - radius * 3 || point.y}
                    alt="node image"
                    href={point.group > 2 ? "/dog.png" : "/bird.png"}
                    class="nodeimage"
                    class:showing={nodeHovered === point.id}
                />
                {#key group}
                    <MetadataPanel
                        {point}
                        {radius}
                        {transform}
                        {nodeHovered}
                        {interval}
                        {data}
                        {group}
                        {paused}
                        color={colourScale(point.group)}
                    />
                {/key}
            {/each}
        </g>
    </g>
</svg>

<style lang="postcss">
    image.nodeimage {
        @apply invisible transition-opacity duration-300 ease-in-out;
    }
    image.showing {
        @apply opacity-100 visible;
    }
    svg {
        float: left;
    }
    circle {
        stroke: #fff;
        stroke-width: 1.5;
    }
</style>

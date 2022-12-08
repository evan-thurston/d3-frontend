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

    const colourScale = d3.scaleOrdinal(d3.schemeAccent);

    import MetadataPanel from "./MetadataPanel.svelte";
    import Modal from "../lib/Modal.svelte";
    import Node from "./Node.svelte";
    import DataNode from "./DataNode.svelte";

    export let data,
        interval,
        group,
        paused,
        grid,
        physicsPaused = false;

    let svg,
        width = 500,
        height = 600,
        transform = d3.zoomIdentity,
        simulation,
        simulationPaused = false,
        nodeHovered,
        multiplier = 1,
        multiplierInterval;

    $: {
        if (paused) {
            clearInterval(multiplierInterval);
        } else {
            clearInterval(multiplierInterval);
            multiplierInterval = setInterval(
                () => (multiplier = Math.round(Math.random() * 10)),
                interval
            );
        }
    }

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
                    .scaleExtent([1 / 3, 3])
                    .on("zoom", zoomed)
            );
    });

    $: radius = ((width + height) ** 0.5 * 2) / data.nodes.length ** 0.5;
    $: links = data.links.map((d) => Object.create(d));
    $: nodes = data.nodes.map((d) => Object.create(d));

    const simulationUpdate = () => {
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
    };

    const pointAlongLink = (link, distance, fromEnd = false) => {
        // Uses linear interpolation to find the point "distance" pixels
        // along the line from link.source to link.target.
        // If fromEnd is true, calculates the point "distance" pixels from the end
        // of the line.
        let totalDist =
            ((gridX(link.source.x) - gridX(link.target.x)) ** 2 +
                (gridY(link.source.y) - gridY(link.target.y)) ** 2) **
            0.5;
        let ratio;
        if (fromEnd) {
            ratio = (totalDist - distance) / totalDist;
        } else {
            ratio = distance / totalDist;
        }
        let newX =
            gridX(link.source.x) +
            (gridX(link.target.x) - gridX(link.source.x)) * ratio;
        let newY =
            gridY(link.source.y) +
            (gridY(link.target.y) - gridY(link.source.y)) * ratio;
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
        transform = currentEvent.transform;
        simulationUpdate();
    };
    const dragsubject = (currentEvent) => {
        const node = simulation.find(
            transform.invertX(gridX(currentEvent.x)),
            transform.invertY(gridY(currentEvent.y)),
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
        currentEvent.subject.fx = transform.invertX(
            gridX(currentEvent.subject.x)
        );
        currentEvent.subject.fy = transform.invertY(
            gridY(currentEvent.subject.y)
        );
    };
    const dragged = (currentEvent) => {
        currentEvent.subject.fx = transform.invertX(gridX(currentEvent.x));
        currentEvent.subject.fy = transform.invertY(gridY(currentEvent.y));
    };
    const dragended = (currentEvent) => {
        if (!currentEvent.active) simulation.alphaTarget(0);
        currentEvent.subject.fx = null;
        currentEvent.subject.fy = null;
    };
    const resize = () => {
        ({ width, height } = svg.getBoundingClientRect());
    };
    const indirectTargeted = (link) => {
        let targeted = false;
        if (link) {
            if (link.source.group === group) targeted = true;
            let foundLinks = links.filter(
                ({ target }) => target.id === link.source.id
            );
            // 3rd degree of indirect targeting
            // ,parentsLinks;
            if (foundLinks) {
                foundLinks.forEach((foundLink) => {
                    if (foundLink.source.group === group) targeted = true;
                    // 3rd degree
                    // parentsLinks = links.filter(
                    //     ({ target }) => target.id === foundLink.source.id
                    // );
                    // parentsLinks.forEach((parentLink) => {
                    //     if (parentLink.source.group === group) targeted = true;
                    // });
                });
            }
        }
        return targeted;
    };

    const gridX = (x) => {
        return Math.round(x / grid) * grid || x || 0;
    };

    const gridY = (y) => {
        return Math.round(y / grid) * grid || y || 0;
    };

    const setNodeHovered = (id) => {
        nodeHovered = id || null;
    }
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:resize={resize}
/>

<svg bind:this={svg} {width} {height}>
    {#if grid > 1}
        {#each Array(Math.round(height / grid) + 1) as _, n}
            <line
                x1={0}
                x2={Math.round(width / grid) * grid}
                y1={n * grid}
                y2={n * grid}
                class="stroke-neutral"
                transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
            />
        {/each}
        {#each Array(Math.round(width / grid) + 1) as _, n}
            <line
                x1={n * grid}
                x2={n * grid}
                y1={0}
                y2={Math.round(height / grid) * grid}
                class="stroke-neutral"
                transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
            />
        {/each}
    {/if}
    <defs>
        <marker
            markerWidth="15"
            markerHeight="15"
            refX="2.5"
            refY="2.5"
            viewBox="0 0 5 5"
            orient="auto"
            id="marker"
            fill="context-stroke"
        >
            <polygon points="0,5 0,0 5,2.5" />
        </marker>
    </defs>
    {#each links as link}
        <g>
            <line
                class={link.source.group === group || indirectTargeted(link)
                    ? "stroke-success"
                    : "stroke-neutral"}
                x1={pointAlongLink(link, radius).x || 0}
                y1={pointAlongLink(link, radius).y || 0}
                x2={pointAlongLink(link, radius + 10, true).x || 0}
                y2={pointAlongLink(link, radius + 10, true).y || 0}
                marker-end="url(#marker)"
                transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
            />
        </g>
        {#if !paused && (link.source.group === group || indirectTargeted(link))}
            <DataNode
                {link}
                {colourScale}
                {radius}
                {pointAlongLink}
                {interval}
                {paused}
                {group}
                {indirectTargeted}
                {transform}
            />
        {/if}
    {/each}
    <g>
        {#each nodes as point}
            <Node
                {point}
                {colourScale}
                {gridX}
                {gridY}
                {radius}
                {multiplier}
                {transform}
                {setNodeHovered}
            />
        {/each}
        <g>
            {#each nodes as point}
                {#key group}
                    <MetadataPanel
                        {point}
                        {radius}
                        {transform}
                        {nodeHovered}
                        {gridX}
                        {gridY}
                        targeted={indirectTargeted(
                            links.find(({ target }) => target.id === point.id)
                        )}
                    />
                {/key}
                {#if point.modalOpened}
                    <foreignObject {height} {width}>
                        <Modal
                            {point}
                            color={colourScale(point.group)}
                            {interval}
                            {paused}
                            targeted={indirectTargeted(
                                links.find(
                                    ({ target }) => target.id === point.id
                                )
                            )}
                        />
                    </foreignObject>
                {/if}
            {/each}
        </g>
    </g>
</svg>

<style lang="postcss">
    svg {
        float: left;
    }
</style>

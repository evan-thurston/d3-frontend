<script>
    import { onMount } from "svelte";
    import { scaleLinear, scaleOrdinal } from "d3-scale";
    import { zoom, zoomIdentity } from "d3-zoom";
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
        select,
        selectAll,
        drag,
        forceSimulation,
        forceLink,
        forceManyBody,
        forceCenter,
    };

    const colourScale = d3.scaleOrdinal([
        "#6e40aa",
        "#a03db3",
        "#d23ea7",
        "#f9488a",
        "#ff5e63",
        "#ff7f41",
        "#efa72f",
        "#cdcf37",
        "#aff05b",
    ]);

    import MetadataPanel from "./MetadataPanel.svelte";
    import Modal from "../modal/Modal.svelte";
    import Node from "./Node.svelte";
    import DataNode from "./DataNode.svelte";
    import Grid from "./Grid.svelte";
    import Link from "./Link.svelte";

    export let links,
        nodes,
        interval,
        group,
        updatesPaused,
        grid,
        resetSim,
        resetTheSim,
        physicsPaused,
        deleteNode,
        setNodes,
        setLinks,
        selectedNodes,
        selectNode,
        nodeSelected;

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
        if (updatesPaused) {
            clearInterval(multiplierInterval);
        } else {
            clearInterval(multiplierInterval);
            multiplierInterval = setInterval(
                () => (multiplier = Math.round(Math.random() * 10)),
                interval
            );
        }
    }

    $: radius = ((width + height) ** 0.5 * 3) / nodes.length ** 0.5;
    $: forceConstant =
        (3 * radius) / (Math.max(1, 750 - width) ** 0.1 * nodes.length ** 0.1);
    $: if (resetSim) {
        stopSim();
        setTimeout(() => {
            startSim();
            simulation.restart();
            simulation.tick();

            if (physicsPaused) simulationPaused = false;
        }, 5);

        resetTheSim();
    }

    $: selectedNodes && simulation && simulationUpdate();

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

    const simulationUpdate = () => {
        simulation.tick();
        setNodes([...nodes]);
        setLinks([...links]);

        if (physicsPaused && !simulationPaused) {
            stopSim();

            simulationPaused = true;
        } else if (!physicsPaused && simulationPaused) {
            startSim();
            simulation.restart();

            simulationPaused = false;
        }
    };

    const startSim = () => {
        radius = ((width + height) ** 0.5 * 2) / nodes.length ** 0.5;
        forceConstant =
            (3 * radius) /
            (Math.max(1, 750 - width) ** 0.1 * nodes.length ** 0.1);

        simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id((d) => d.id)
                    .distance(forceConstant * 6)
            )
            .force("charge", d3.forceManyBody().strength(forceConstant * -9))
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

    const setNodeHovered = (id) => {
        nodeHovered = id || null;
    };

    const connectedBothWays = (link) => {
        let connected = false,
            connectedToSource = links.filter(
                ({ target }) => target.id === link.source.id
            );
        connectedToSource.forEach((sourceLink) => {
            if (sourceLink.source === link.target) connected = true;
        });
        return connected;
    };

    const focusSvg = () => {
        focus(svg);
    };
</script>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:resize={resize}
/>

<!-- <p class='fixed w-full h-full py-auto text-3xl bg-gray-100 bg-opacity-30 text-center'>
    click here to start simulation
</p> -->
<!-- <svg bind:this={svg} class='fixed bottom-0 right-0 w-1/12 h-1/12 z-50'/> -->

<svg bind:this={svg} {width} {height}>
    {#if grid > 1}
        <Grid {width} {height} {grid} {transform} />
    {/if}
    <defs>
        <marker
            markerWidth="9"
            markerHeight="9"
            refX="2.5"
            refY="2.5"
            viewBox="0 0 5 5"
            orient="auto"
            id="marker"
            class="fill-primary"
        >
            <polygon points="0,5 0,0 5,2.5" />
        </marker>
    </defs>
    {#each links as link}
        <Link
            {link}
            {group}
            {indirectTargeted}
            {transform}
            {grid}
            bothWays={connectedBothWays(link)}
        />
        {#if !updatesPaused && (link.source.group === group || indirectTargeted(link))}
            <DataNode
                {link}
                {colourScale}
                {radius}
                {interval}
                {updatesPaused}
                {group}
                {grid}
                {indirectTargeted}
                {transform}
                bothWays={connectedBothWays(link)}
            />
        {/if}
    {/each}
    <g>
        {#each nodes as point}
            <Node
                {point}
                {colourScale}
                {grid}
                {radius}
                {multiplier}
                {transform}
                {setNodeHovered}
                {selectNode}
                {nodeSelected}
            />
        {/each}
        <g>
            {#each nodes as point}
                <!-- {#key group}
                    <MetadataPanel
                        {point}
                        {radius}
                        {transform}
                        {nodeHovered}
                        targeted={indirectTargeted(
                            links.find(({ target }) => target.id === point.id)
                        )}
                    />
                {/key} -->
                {#if point.modalOpened}
                    <foreignObject {height} {width}>
                        <Modal
                            {point}
                            color={colourScale(point.group)}
                            {interval}
                            {updatesPaused}
                            targeted={indirectTargeted(
                                links.find(
                                    ({ target }) => target.id === point.id
                                )
                            )}
                            {focusSvg}
                            {deleteNode}
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

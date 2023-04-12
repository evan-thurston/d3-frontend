<script>
    import { onMount } from 'svelte';

    import { scaleLinear, scaleOrdinal } from 'd3-scale';
    import { zoom, zoomIdentity } from 'd3-zoom';
    import { select, selectAll } from 'd3-selection';
    import { drag } from 'd3-drag';
    import {
        forceSimulation,
        forceLink,
        forceManyBody,
        forceCenter,
    } from 'd3-force';

    import Node from './Node.svelte';
    import DataNode from './DataNode.svelte';
    import Link from './Link.svelte';
    import Grid from './Grid.svelte';

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
        '#6e40aa',
        '#a03db3',
        '#d23ea7',
        '#f9488a',
        '#ff5e63',
        '#ff7f41',
        '#efa72f',
        '#cdcf37',
        '#aff05b',
    ]);

    export let width,
        height,
        nodes,
        links,
        setNodes,
        setLinks,
        selectNode,
        physicsPaused,
        emitterId,
        interval,
        updatesPaused,
        grid,
        restartSim;

    let svg,
        transform = d3.zoomIdentity,
        simulation,
        simulationPhysicsPaused = false;

    $: radius = ((width + height) ** 0.5 * 3) / nodes.length ** 0.5;
    $: forceConstant =
        (6 * radius) / (Math.max(1, 750 - width) ** 0.1 * nodes.length ** 0.1);
    $: grid && simulationUpdate();

    onMount(() => {
        startSim();
        d3.select(svg)
            .call(
                d3
                    .drag()
                    .container(svg)
                    .subject(dragsubject)
                    .on('start', dragstarted)
                    .on('drag', dragged)
                    .on('end', dragended)
            )
            .call(
                d3
                    .zoom()
                    .scaleExtent([1 / 3, 3])
                    .on('zoom', zoomed)
            );
    });

    const startSim = () => {
        simulation = d3
            .forceSimulation(nodes)
            .force(
                'link',
                d3
                    .forceLink(links)
                    .id((d) => d.id)
                    .distance(forceConstant * 1.2)
            )
            .force('charge', d3.forceManyBody().strength(forceConstant * -9))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .on('tick', simulationUpdate);
        restartSim = false;
    };

    const stopSim = () => {
        simulation.stop();
        simulation
            .force('link', null)
            .force('charge', null)
            .force('center', null);
    };

    const simulationUpdate = () => {
        simulation.tick();
        setNodes([...nodes]);
        setLinks([...links]);

        if (physicsPaused && !simulationPhysicsPaused) {
            stopSim();

            simulationPhysicsPaused = true;
        } else if (!physicsPaused && simulationPhysicsPaused) {
            startSim();
            simulation.restart();

            simulationPhysicsPaused = false;
        }
    };

    const zoomed = (currentEvent) => {
        transform = currentEvent.transform;
    };

    const dragsubject = (currentEvent) => {
        let node = simulation.find(
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

    const gridX = (x) => {
        return Math.round(x / grid) * grid || x || 100;
    };

    const gridY = (y) => {
        return Math.round(y / grid) * grid || y || 100;
    };
</script>

<svelte:window on:resize={resize} />

<svg
    bind:this={svg}
    {width}
    {height}
>
    <!-- ARROW MARKER DEFINITION -->
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

    {#if grid > 0}
        <Grid
            {width}
            {height}
            {grid}
            {transform}
        />
    {/if}

    {#each links as link}
        <Link
            {link}
            {transform}
            bothWays={connectedBothWays(link)}
            {emitterId}
            {gridX}
            {gridY}
        />
        {#if !updatesPaused && link.source.id === emitterId}
            <DataNode
                {transform}
                {link}
                colour={colourScale(link.source.group)}
                radius={radius / 5}
                {interval}
                bothWays={connectedBothWays(link)}
            />
        {/if}
    {/each}
    <g>
        {#each nodes as node}
            <Node
                {node}
                {radius}
                {transform}
                colour={colourScale(node.group)}
                {selectNode}
                {gridX}
                {gridY}
            />
        {/each}
    </g>
</svg>

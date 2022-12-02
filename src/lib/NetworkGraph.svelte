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
    export let data;

    let svg;
    let width = 500;
    let height = 600;
    $: radius = (2 * Math.sqrt(width + height) / Math.sqrt(data.nodes.length));
    const colourScale = d3.scaleOrdinal(d3.schemeAccent);
    let transform = d3.zoomIdentity;
    let simulation;
    let nodeHovered;
    export let loaded;

    export let physicsPaused = false;
    let simulationPaused = false;

    onMount(() => {
        startSim();

        d3.select(svg).call(
            d3
                .drag()
                .container(svg)
                .subject(dragsubject)
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
        );
        loaded = true;
        // TODO: zoom doesn't work with hovering text
        // .call(
        //     d3
        //         .zoom()
        //         .scaleExtent([1 / 10, 8])
        //         .on("zoom", zoomed)
        // );
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
        // TODO: this doesn't work (shortening link length to display arrows, currently arrows are hidden behind nodes)

        // let linkSelection = d3.select(svg).selectAll("g.link").select("line");

        // linkSelection.each( (d, i, n) => {
        //     // current path length
        //     const pl = this.getTotalLength();
        //     // radius of marker head plus def constant
        //     const mrs = (d.source.size);
        //     const mrt = (d.target.size) + 12;
        //     // get new start and end points
        //     const m1 = this.getPointAtLength(mrs);
        //     const m2 = this.getPointAtLength(pl - mrt);
        //     // new line start and end
        //     d3.select(n[i])
        //         .attr("x1", m1.x)
        //         .attr("y1", m1.y)
        //         .attr("x2", m2.x)
        //         .attr("y2", m2.y);
        // });
    }

    const startSim = () => {
        simulation = d3
            .forceSimulation(nodes)
            .force(
                "link",
                d3
                    .forceLink(links)
                    .id((d) => d.id)
                    .distance((radius * 9) / ((Math.pow(Math.max(1, 750-width), 0.1 )) * (Math.pow(nodes.length, 0.1))))
            )
            .force("charge", d3.forceManyBody().strength((radius * -60) / (( Math.pow(Math.max(1, 750-width), 0.1 ) ) * ( Math.pow(nodes.length, 0.2 )))))
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
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
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
                    y={-radius * 1.2}
                    text-anchor="middle"
                    transform="translate({point.x || 0} {point.y || 0}) scale({transform.k} {transform.k})"
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
                    transform="translate({point.x || 0} {point.y || 0}) scale({transform.k} {transform.k})"
                    width={radius}
                    height={radius}
                    x={-radius / 2}
                    y={-radius * 3}
                    alt="node image"
                    href={point.group > 2 ? "/dog.png" : "/bird.png"}
                    class:showing={nodeHovered === point.id}
                />
                <MetadataPanel {point} {radius} {transform} {nodeHovered} />
            {/each}
        </g>
    </g>
</svg>

<style lang="postcss">
    image {
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

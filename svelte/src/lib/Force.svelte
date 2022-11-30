<script>
  // @ts-nocheck
  import * as d3 from "d3";

  import { forceSimulation } from "d3-force";
  import { onMount } from "svelte";

  // utility function for translating elements
  const move = (x, y) => `transform: translate(${x}px, ${y}px`;

  // an array of our particles
  export let dots = [];
  // an array of [name, force] pairs
  export let forces = [];

  let usedForceNames = [];
  let renderedDots = [];
  let renderedLinks = [];

  let width,
    height = 800;

  export let nodeRadius = 30;

  $: nodes = dots.map((d) => Object.create(d));

  export let links;

  let newLinks = [];

  let element;

  $: simulation = forceSimulation()
    .nodes(nodes)
    .on("tick", () => {
      // update the renderedDots reference to trigger an update
      renderedDots = [...nodes];
      links = [...links];
    });

  $: {
    // re-initialize forces when they change
    forces.forEach(([name, force]) => {
      simulation.force(name, force);
    });

    // remove old forces
    const newForceNames = forces.map(([name]) => name);
    let oldForceNames = usedForceNames.filter(
      (force) => !newForceNames.includes(force)
    );
    oldForceNames.forEach((name) => {
      simulation.force(name, null);
    });
    usedForceNames = newForceNames;

    // kick our simulation into high gear
    simulation.alpha(1);
    simulation.restart();
  }
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<figure class="c" bind:clientWidth={width}>
  <svg bind:this={element} {width} height={height - 96}>
    {#each renderedDots as { x, y }, i}
      <g style={move(x, y)}>
        <text class="fill-slate-500" y={-nodeRadius * 1.2} text-anchor="middle"
          >Name: {renderedDots[i].name}</text
        >
        <circle r={nodeRadius} />
      </g>
    {/each}
    {#each links as link}
      <g stroke="#999" stroke-opacity="0.6" class="link">
        <!-- x2={(link.target.x > link.source.x) ? link.target.x - radius : link.target.x + radius} -->
        <!-- y2={(link.target.y > link.source.y) ? link.target.y - radius : link.target.y + radius} -->
        <!-- transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})" -->
        <line
          stroke-width="10px"
          x1={link.source.x}
          y1={link.source.y}
          x2={link.target.x}
          y2={link.target.y}
          marker-end="url(#SvgjsMarker1019)"
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
          <polygon points="0,5 0,0 5,2.5" fill="hsl(0, 0%, 50%)" />
        </marker>
      </defs>
    {/each}
  </svg>
</figure>

<style>
  figure {
    margin: 36px 0 0 0;
  }
  svg {
    overflow: visible;
  }
  circle {
    fill: #0b2830;
  }
</style>

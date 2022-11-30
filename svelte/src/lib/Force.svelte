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

  export let links;

  let newLinks = [];

  let element;

  $: simulation = forceSimulation()
    .nodes(dots)
    .on("tick", () => {
      // update the renderedDots reference to trigger an update
      renderedDots = [...dots];
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
        <text class="fill-slate-500" y={-nodeRadius * 1.5} text-anchor="middle"
          >Name: {renderedDots[i].name}</text
        >
        <circle r={nodeRadius} />
      </g>
    {/each}
    {#each links as link}
      <line
        stroke-width="10px"
        x1={link.source.x}
        y1={link.source.y}
        x2={link.target.x}
        y2={link.target.y}
      />
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

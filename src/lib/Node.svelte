<script>
    export let point,
        colourScale,
        setNodeHovered,
        gridX,
        gridY,
        radius,
        multiplier,
        transform;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<g
    on:click={() => {
        if (!point.modalOpened) point.modalOpened = true;
        else point.modalOpened = false;
    }}
    on:mouseenter={setNodeHovered(point.id)}
    on:mouseleave={setNodeHovered}
    class="node"
>
    <text
        fill={colourScale(point.group)}
        x={gridX(point.x)}
        y={gridY(point.y) - radius * 1.2 || gridY(point.y)}
        text-anchor="middle"
        transform="
        translate({transform.x || 0} {transform.y || 0}) 
        scale({transform.k} {transform.k})"
    >
        ID: {point.id}
    </text>
    {#if point.data}
        {#each ["x", "y"] as coord, i}
            <text
                class="fill-warning"
                x={gridX(point.x)}
                y={gridY(point.y) + radius * (1.7 + 0.5 * i) || gridY(point.y)}
                text-anchor="middle"
                transform="
                translate({transform.x || 0} {transform.y || 0}) 
                scale({transform.k} {transform.k})"
            >
                {coord === "x"
                    ? "x: " + Math.round(gridX(point.x))
                    : "y: " + Math.round(gridY(point.y))}
            </text>
        {/each}
        {#each point.data.slice(0, 3) as field, i}
            <text
                class={typeof field.value === "string"
                    ? "fill-success"
                    : typeof field.value === "number"
                    ? "fill-warning"
                    : "fill-error"}
                x={gridX(point.x)}
                y={gridY(point.y) + radius * (2.7 + 0.5 * i) || gridY(point.y)}
                text-anchor="middle"
                transform="
                translate({transform.x || 0} {transform.y || 0}) 
                scale({transform.k} {transform.k})"
            >
                {field.label}: {field.value +
                    (typeof field.value === "number" ? multiplier * i : "")}
            </text>
        {/each}
    {/if}
    <!-- squares -->
    {#if point.group === 5}
        <rect
            class="node"
            width={radius * 2}
            height={radius * 2}
            fill={colourScale(point.group)}
            x={gridX(point.x) - radius || gridX(point.x)}
            y={gridY(point.y) - radius || gridY(point.y)}
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
    <!-- triangles -->
    {:else if point.group === 6}
        <polygon
            class="node"
            points="{gridX(point.x) - radius},{gridY(point.y) + radius}
            {gridX(point.x) + radius},{gridY(point.y) + radius} 
            {gridX(point.x)},{gridY(point.y) - radius}"
            fill={colourScale(point.group)}
            x={gridX(point.x) - radius || gridX(point.x)}
            y={gridY(point.y) - radius || gridY(point.y)}
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
    <!-- circles -->
    {:else}
        <circle
            class="node"
            r={radius}
            fill={colourScale(point.group)}
            cx={gridX(point.x)}
            cy={gridY(point.y)}
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
    {/if}
</g>

<style lang="postcss">
    circle.node,
    rect.node,
    polygon.node {
        stroke: #fff;
        stroke-width: 1.5;
    }
</style>

<script>
    export let node, radius, transform, colour, selectNode, gridX, gridY;

    $: if (node.x) node.x = gridX(node.x);
    $: if (node.y) node.y = gridY(node.y);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<g
    on:click={() => {
        if (!node.selected && window) window.location.href = '#' + node.id;
        selectNode(node.id);
    }}
>
    <text
        font-size={30}
        fill={colour}
        x={node.x}
        y={node.y - radius * 1.35 || node.y}
        text-anchor="middle"
        transform="
        translate({transform.x || 0} {transform.y || 0}) 
        scale({transform.k} {transform.k})"
    >
        ID: {node.id}
    </text>

    <circle
        class={node.selected ? 'stroke-[0.9rem]' : 'stroke-[0.3rem]'}
        r={radius}
        fill={colour}
        stroke-opacity={0.6}
        stroke={colour}
        cx={node.x}
        cy={node.y}
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    />
</g>

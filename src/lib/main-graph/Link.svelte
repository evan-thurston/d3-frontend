<script>
    export let link, transform, bothWays, emitterId, gridX, gridY;

    $: if (link.source.x) link.source.x = gridX(link.source.x);
    $: if (link.source.y) link.source.y = gridY(link.source.y);
    $: if (link.target.x) link.target.x = gridX(link.target.x);
    $: if (link.target.y) link.target.y = gridY(link.target.y);

    $: firstControl = control(link.source.x, link.source.y, midX(), midY());
    $: secondControl = control(midX(), midY(), link.target.x, link.target.y);
    $: midControl = control(
        link.source.x,
        link.source.y,
        link.target.x,
        link.target.y
    );

    const midX = () => {
        return (link.source.x + link.target.x) / 2;
    };

    const midY = () => {
        return (link.source.y + link.target.y) / 2;
    };

    const control = (x1, y1, x2, y2) => {
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;

        let theta = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2;
        let offset = 30;
        let deltaX = offset * Math.cos(theta);
        let deltaY = offset * Math.sin(theta);

        return { x: midX + deltaX, y: midY + deltaY };
    };
</script>

{#if link.source.x !== link.target.x || link.source.y !== link.target.y}
    <g>
        <path
            d="
                M {link.source.x}, {link.source.y}
                {bothWays
                ? `Q ${firstControl.x},${firstControl.y} ${midControl.x},${midControl.y}
                        Q ${secondControl.x},${secondControl.y} ${link.target.x},${link.target.y}`
                : `L ${(link.source.x + link.target.x) / 2},
                        ${(link.source.y + link.target.y) / 2} 
                        L ${link.target.x},${link.target.y}`}
            "
            class="fill-none
            {link.source.id === emitterId
                ? 'stroke-success'
                : bothWays
                ? 'stroke-info'
                : 'stroke-primary'}"
            marker-mid="url(#marker)"
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
    </g>
{/if}

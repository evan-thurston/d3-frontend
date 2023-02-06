<script>
    export let link, group, indirectTargeted, transform, grid, bothWays;

    const gridX = (x) => {
        return Math.round(x / grid) * grid || x || 100;
    };

    const gridY = (y) => {
        return Math.round(y / grid) * grid || y || 100;
    };

    $: if (grid > 1 && link.source.x) link.source.x = gridX(link.source.x);
    $: if (grid > 1 && link.source.y) link.source.y = gridY(link.source.y);
    $: if (grid > 1 && link.target.x) link.target.x = gridX(link.target.x);
    $: if (grid > 1 && link.target.y) link.target.y = gridY(link.target.y);

    $: first = control(link.source.x, link.source.y, midX(), midY());
    $: second = control(midX(), midY(), link.target.x, link.target.y);
    $: controlPoint = control(
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

<g>
    {#if link.source.x !== link.target.x || link.source.y !== link.target.y}
        <path
            d="
                M {link.source.x}, {link.source.y}
                {bothWays
                ? `Q ${first.x},${first.y} ${controlPoint.x},${controlPoint.y}
                    Q ${second.x},${second.y} ${link.target.x},${link.target.y}`
                : `L ${(link.source.x + link.target.x) / 2},
                    ${(link.source.y + link.target.y) / 2} 
                    L ${link.target.x},${link.target.y}`}
            "
            class="fill-none 
            {link.source.group === group || indirectTargeted(link)
                ? 'stroke-success'
                : bothWays
                ? 'stroke-info'
                : 'stroke-neutral'}"
            marker-mid="url(#marker)"
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
    {/if}
</g>

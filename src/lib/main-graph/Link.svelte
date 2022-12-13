<script>
    export let link,
        group,
        indirectTargeted,
        pointAlongLink,
        radius,
        transform,
        grid,
        bothWays;

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

    const midX = (link) => {
        return (
            (link.source.x + link.target.x) / 2 -
                (link.target.y - link.source.y) / 9 || 0
        );
    };
    const midY = (link) => {
        return (
            (link.source.y + link.target.y) / 2 +
                (link.target.x - link.source.x) / 9 || 0
        );
    };
</script>

<g>
    <!-- <line
        class={link.source.group === group || indirectTargeted(link)
            ? "stroke-success"
            : "stroke-neutral"}
        x1={pointAlongLink(link, radius).x || 0}
        y1={pointAlongLink(link, radius).y || 0}
        x2={pointAlongLink(link, radius + 10, true).x || 0}
        y2={pointAlongLink(link, radius + 10, true).y || 0}
        marker-end="url(#marker)"
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    /> -->
    {#if link.source.x !== link.target.x || link.source.y !== link.target.y}
        <path
            d="M {pointAlongLink(link, radius).x},{pointAlongLink(link, radius)
                .y}
        Q {midX(link)},{midY(link)} {pointAlongLink(link, radius + 15, true)
                .x},{pointAlongLink(link, radius + 15, true).y}"
            class="fill-none {link.source.group === group ||
            indirectTargeted(link)
                ? 'stroke-success'
                : bothWays
                ? 'stroke-info'
                : 'stroke-neutral'}"
            marker-end="url(#marker)"
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        />
    {/if}
</g>

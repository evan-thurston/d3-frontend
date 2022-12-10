<script>
    export let link,
        colourScale,
        radius,
        pointAlongLink,
        interval,
        paused,
        group,
        indirectTargeted,
        transform;

    const midX = (link) => {
        return (
            (link.source.x + link.target.x) / 2 -
            (link.target.y - link.source.y) / 10
        );
    };
    const midY = (link) => {
        return (
            (link.source.y + link.target.y) / 2 +
            (link.target.x - link.source.x) / 10
        );
    };
</script>

<circle
    class="dataNode"
    r={radius / 5}
    fill={colourScale(link.source.group)}
    transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
>
    <animate
        class="no-animation"
        attributeName="cx"
        values="{pointAlongLink(link, radius - 15).x};{midX(link)};{pointAlongLink(
            link,
            radius - 10,
            true
        ).x}"
        dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
        repeatCount={!paused &&
        (link.source.group === group || indirectTargeted(link))
            ? "indefinite"
            : "0"}
    />
    <animate
        class="no-animation"
        attributeName="cy"
        values="{pointAlongLink(link, radius - 15).y};{midY(link)};{pointAlongLink(
            link,
            radius - 10,
            true
        ).y}"
        dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
        repeatCount={!paused &&
        (link.source.group === group || indirectTargeted(link))
            ? "indefinite"
            : "0"}
    />
    <!-- <animateMotion
        dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
        repeatCount={!paused &&
        (link.source.group === group || indirectTargeted(link))
            ? "indefinite"
            : "0"}
        path="M {pointAlongLink(link, radius).x},{pointAlongLink(link, radius)
            .y}
            Q {midX(link)},{midY(link)} {pointAlongLink(link, radius, true)
            .x},{pointAlongLink(link, radius, true).y}"
    /> -->
</circle>
{#each Array(link.source.group % 6) as _, i}
    <circle
        class="dataNode"
        r={radius / 5}
        fill={colourScale(link.source.group)}
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    >
        <animate
            class="no-animation"
            attributeName="cx"
            values="{pointAlongLink(link, radius - 15).x};{midX(link)};{pointAlongLink(
                link,
                radius - 10,
                true
            ).x}"
            dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
            begin={((i * interval) / 5000 / link.source.group) % 6 || i + "s"}
            repeatCount={!paused &&
            (link.source.group === group || indirectTargeted(link))
                ? "indefinite"
                : "0"}
        />
        <animate
            class="no-animation"
            attributeName="cy"
            values="{pointAlongLink(link, radius - 15).y};{midY(link)};{pointAlongLink(
                link,
                radius - 10,
                true
            ).y}"
            dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
            begin={((i * interval) / 5000 / link.source.group) % 6 || i + "s"}
            repeatCount={!paused &&
            (link.source.group === group || indirectTargeted(link))
                ? "indefinite"
                : "0"}
        />
        <!-- <animateMotion
            dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
            begin={((i * interval) / 5000 / link.source.group) % 6 || i + "s"}
            repeatCount={!paused &&
            (link.source.group === group || indirectTargeted(link))
                ? "indefinite"
                : "0"}
            path="M {pointAlongLink(link, radius).x},{pointAlongLink(
                link,
                radius
            ).y}
            Q {midX(link)},{midY(link)} {pointAlongLink(link, radius, true)
                .x},{pointAlongLink(link, radius, true).y}"
        /> -->
    </circle>
{/each}

<script>
    export let link,
        colourScale,
        radius,
        interval,
        updatesPaused,
        group,
        grid,
        indirectTargeted,
        transform,
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

    $: first = control(link.source.x, link.source.y, midX(), midY(), 21);
    $: second = control(midX(), midY(), link.target.x, link.target.y, 21);
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

    const control = (x1, y1, x2, y2, offset = 30) => {
        let midX = (x1 + x2) / 2;
        let midY = (y1 + y2) / 2;

        let theta = Math.atan2(y2 - y1, x2 - x1) - Math.PI / 2;
        let deltaX = offset * Math.cos(theta);
        let deltaY = offset * Math.sin(theta);

        return { x: midX + deltaX, y: midY + deltaY };
    };

    // TODO: pause/freeze animation https://codepen.io/jjdewitt/pen/XJRqNK
    // $: if(updatesPaused || !(link.source.group === group || indirectTargeted(link))) document.getElementById('node').pauseAnimations();
    // $: if(updatesPaused && document.getElementById('node')) document.getElementById('node').pauseAnimations();
</script> 

{#if link.source.x !== link.target.x || link.source.y !== link.target.y}
    <circle
    id='node'
        class="dataNode"
        r={radius / 5}
        fill={colourScale(link.source.group)}
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    >
        <animate
            attributeName="cx"
            values={bothWays
                ? `${link.source.x};${first.x};${controlPoint.x};${second.x};${link.target.x}`
                : `${link.source.x};${link.target.x}`}
            dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
            repeatCount={"indefinite"}
        />
        <animate
            attributeName="cy"
            values={bothWays
                ? `${link.source.y};${first.y};${controlPoint.y};${second.y};${link.target.y}`
                : `${link.source.y};${link.target.y}`}
            dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
            repeatCount={"indefinite"}
        />
    </circle>
    <!-- {#each Array(link.source.group % 6) as _, i}
        <circle
            class="dataNode"
            r={radius / 5}
            fill={colourScale(link.source.group)}
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
            <animate
                class="no-animation"
                attributeName="cx"
                values="{link.source
                    .x};{first.x};{controlPoint.x};{second.x};{link.target.x}"
                dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
                begin={((i * interval) / 5000 / link.source.group) % 6 ||
                    i + "s"}
                repeatCount={!paused &&
                (link.source.group === group || indirectTargeted(link))
                    ? "indefinite"
                    : "0"}
            />
            <animate
                class="no-animation"
                attributeName="cy"
                values="{link.source
                    .y};{first.y};{controlPoint.y};{second.y};{link.target.y}"
                dur={(interval / 1000 / link.source.group) % 6 || 5 + "s"}
                begin={((i * interval) / 5000 / link.source.group) % 6 ||
                    i + "s"}
                repeatCount={!paused &&
                (link.source.group === group || indirectTargeted(link))
                    ? "indefinite"
                    : "0"}
            />
        </circle>
    {/each} -->
{/if}

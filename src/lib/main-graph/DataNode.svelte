<script>
    export let transform, link, colour, radius, bothWays, interval;

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

    // TODO: pause/freeze animation https://codepen.io/jjdewitt/pen/XJRqNK
    // $: if(updatesPaused || !(link.source.group === group || indirectTargeted(link))) document.getElementById('node').pauseAnimations();
    // $: if(updatesPaused && document.getElementById('node')) document.getElementById('node').pauseAnimations();
</script>

{#if link.source.x !== link.target.x || link.source.y !== link.target.y}
    <circle
        r={radius}
        fill={colour}
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    >
        <animate
            attributeName="cx"
            values={bothWays
                ? `${link.source.x};${firstControl.x};${midControl.x};${secondControl.x};${link.target.x}`
                : `${link.source.x};${link.target.x}`}
            dur={interval / 1000 || 5 + 's'}
            repeatCount={'indefinite'}
        />
        <animate
            attributeName="cy"
            values={bothWays
                ? `${link.source.y};${firstControl.y};${midControl.y};${secondControl.y};${link.target.y}`
                : `${link.source.y};${link.target.y}`}
            dur={interval / 1000 || 5 + 's'}
            repeatCount={'indefinite'}
        />
    </circle>
    {#each Array(2) as _, i}
        <circle
            r={radius}
            fill={colour}
            transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
        >
            <animate
                attributeName="cx"
                values={bothWays
                    ? `${link.source.x};${firstControl.x};${midControl.x};${secondControl.x};${link.target.x}`
                    : `${link.source.x};${link.target.x}`}
                dur={interval / 1000 || 5 + 's'}
                begin={(i + 1) * (interval / 15000) + 's'}
                repeatCount={'indefinite'}
            />
            <animate
                attributeName="cy"
                values={bothWays
                    ? `${link.source.y};${firstControl.y};${midControl.y};${secondControl.y};${link.target.y}`
                    : `${link.source.y};${link.target.y}`}
                dur={interval / 1000 || 5 + 's'}
                begin={(i + 1) * (interval / 15000) + 's'}
                repeatCount={'indefinite'}
            />
        </circle>
    {/each}
{/if}

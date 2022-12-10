<script>
    export let point, radius, transform, nodeHovered, targeted;

    let height, width;

    $: popupWidth = (width + height) ** 0.65 || 200;
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<foreignObject
    height={popupWidth / 1.5}
    width={popupWidth}
    x={point.x - popupWidth / 2 || point.x}
    y={point.y + radius * 1.5 || point.y}
    transform="translate({transform.x || 0} {transform.y ||
        0}) scale({transform.k} {transform.k})"
    class:showing={nodeHovered === point.id}
>
    <img
        class="fixed top-4 left-4"
        width={popupWidth / 10}
        height={popupWidth / 10}
        alt={point.group > 2 ? "dog" : "bird"}
        src={point.group > 2 ? "/dog.png" : "/bird.png"}
    />
    <p>
        ID: {point.id}
    </p>
    <p>
        group: {point.group}
    </p>
    <p>
        icon: {point.group > 2 ? "dog" : "bird"}
    </p>
    <p>
        targeted: {targeted || false}
    </p>
</foreignObject>

<style lang="postcss">
    foreignObject {
        @apply bg-base-200 p-2 shadow-xl shadow-base-300
        border-4 border-base-300 rounded-lg 
        text-center
        opacity-0 invisible 
        transition-opacity duration-300 ease-in-out
        flex flex-col;
    }
    foreignObject.showing {
        @apply opacity-100 visible;
    }
    foreignObject p {
        @apply text-xs md:text-sm 2xl:text-base;
    }
</style>

<script>
    import { onMount } from "svelte";

    export let left = 100;
    export let top;
    export let right;
    export let bottom = 100;

    let height, width;
    let moving = false;

    onMount(() => {
        top = height - 100;
        right = width - 100;
    });

    const onMouseDown = () => {
        moving = true;
    };

    const onMouseMove = (e) => {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
            right -= e.movementX;
            bottom -= e.movementY;
        }
    };

    const onMouseUp = (e) => {
        if (moving) {
            if (e.clientX < width / 2) {
                left = 100;
                right = width - 100;
            } else {
                right = 100;
                left = (width * 2) / 3;
            }
            if (e.clientY < height / 2) {
                top = 100;
                bottom = (height * 3) / 4;
            } else {
                top = height - 100;
                bottom = 100;
            }
        }
        moving = false;
    };
</script>

<section
    on:mousedown={onMouseDown}
    style="left: {left}px; top: {top}px; right: {right}px; bottom: {bottom}px;"
    class="draggable 2xl:absolute"
    class:transition-all={!moving}
>
    <slot />
</section>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
/>

<style>
    .draggable {
        user-select: none;
        cursor: move;
        /* position: absolute; */
    }
</style>

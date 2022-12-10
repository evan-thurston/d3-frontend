<script>
    import { onMount } from "svelte";
    import ControlPanel from "./ControlPanel.svelte";

    export let reset,
        toggle,
        jsonEdit,
        swapData,
        updateData,
        interval,
        incInterval,
        decInterval,
        group,
        incGroup,
        decGroup,
        paused,
        groupLimit,
        pauseUpdates,
        grid,
        incGrid,
        decGrid;

    let height,
        width,
        h,
        w,
        updateInterval,
        progressInterval,
        top,
        right,
        left = 100,
        bottom = 100,
        moving = false,
        updates = 0,
        progress = 100;

    onMount(() => {
        top = height - 100;
        right = width - w - 100;
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
                right = width - w - 100;
            } else {
                right = 100;
                left = width - w - 100;
            }
            if (e.clientY < height / 2) {
                top = 100 + h;
                bottom = height - 100 - h;
            } else {
                top = height - 100;
                bottom = 100;
            }
        }
        moving = false;
    };

    const incr = () => {
        updates++;
    };
    const prog = () => {
        if (progress < interval) progress += interval / 10;
        else progress = interval / 10;
    };

    const resetProg = () => {
        updates = 0;
        clearInterval(updateInterval);
        updateInterval = setInterval(incr, interval);
        clearInterval(progressInterval);
        progressInterval = setInterval(prog, interval / 10);
    };

    $: {
        if (paused) {
            clearInterval(updateInterval);
        } else {
            clearInterval(updateInterval);
            updateInterval = setInterval(incr, interval);
            progress = interval / 10;
        }
    }
    $: {
        if (paused) {
            clearInterval(progressInterval);
            progress = interval / 10;
        } else {
            clearInterval(progressInterval);
            progressInterval = setInterval(prog, interval / 10);
        }
    }
</script>

<section
    on:mousedown={onMouseDown}
    style="left: {left}px; top: {top}px; right: {right}px; bottom: {bottom}px;"
    class="draggable 2xl:absolute w-fit h-fit"
    class:transition-all={!moving}
>
    <div
        bind:clientHeight={h}
        bind:clientWidth={w}
        class="absolute bottom-0 2xl:bottom-4 flex flex-col px-auto 2xl:ml-4 bg-base-200 p-4 md:p-8 rounded-lg rounded-b-none 2xl:rounded-b-lg w-full 2xl:min-w-max shadow-base-300 shadow-xl border-t-4 2xl:border-4 border-base-300"
    >
        <ControlPanel
            {reset}
            {resetProg}
            {toggle}
            {jsonEdit}
            {swapData}
            {updateData}
            {interval}
            {incInterval}
            {decInterval}
            {group}
            {incGroup}
            {decGroup}
            {paused}
            {groupLimit}
            {pauseUpdates}
            {grid}
            {incGrid}
            {decGrid}
            {width}
            {updates}
            {progress}
        />
    </div>
</section>

<svelte:window
    bind:innerHeight={height}
    bind:innerWidth={width}
    on:mouseup={onMouseUp}
    on:mousemove={onMouseMove}
/>

<style lang="postcss">
    .draggable {
        @apply select-none cursor-move;
    }
</style>

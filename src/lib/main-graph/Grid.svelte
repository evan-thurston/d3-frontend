<script>
    export let width, height, grid, transform;
    let cols = Math.round(width / grid),
        rows = Math.round(height / grid),
        griddedWidth = cols * grid,
        griddedHeight = rows * grid;
</script>

{#each Array(3 * rows + 1) as _, n}
    <line
        x1={-griddedWidth}
        x2={2 * griddedWidth}
        y1={n * grid - griddedHeight}
        y2={n * grid - griddedHeight}
        class="stroke-base-300"
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    />
{/each}
{#each Array(3 * cols + 1) as _, n}
    <line
        x1={n * grid - griddedWidth}
        x2={n * grid - griddedWidth}
        y1={-griddedHeight}
        y2={2 * griddedHeight}
        class="stroke-base-300"
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    />
{/each}

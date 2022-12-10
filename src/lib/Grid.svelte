<script>
    export let width, height, grid, transform;
</script>

{#each Array(3 * Math.round(height / grid) + 1) as _, n}
    <line
        x1={-(Math.round(width / grid) * grid)}
        x2={2 * (Math.round(width / grid) * grid)}
        y1={n * grid - Math.round(height / grid) * grid}
        y2={n * grid - Math.round(height / grid) * grid}
        class="stroke-neutral"
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    />
{/each}
{#each Array(3 * Math.round(width / grid) + 1) as _, n}
    <line
        x1={n * grid - Math.round(width / grid) * grid}
        x2={n * grid - Math.round(width / grid) * grid}
        y1={-(Math.round(height / grid) * grid)}
        y2={2 * (Math.round(height / grid) * grid)}
        class="stroke-neutral"
        transform="translate({transform.x} {transform.y}) scale({transform.k} {transform.k})"
    />
{/each}

<script>
    export let value;
</script>

<span
    class={typeof value === "string"
        ? "text-success"
        : typeof value === "number"
        ? "text-info"
        : typeof value === "object"
        ? "text-warning"
        : "text-error"}
>
    <slot />
</span>

<script>
    import '../app.css';
    import Navbar from '../lib/nav/Navbar.svelte';
</script>

<svelte:head>
    <title>D3 Frontend project</title>
    <meta
        name="description"
        content="Matlab clone using d3js & sveltekit"
    />
</svelte:head>

<main data-theme="greentheme">
    <Navbar />
    <slot />
</main>

<style lang="postcss">
    main {
        @apply w-screen h-screen bg-base-300;
    }
    :global(.primaryButton) {
        @apply btn btn-primary;
    }
    :global(.disabledButton) {
        @apply btn btn-disabled;
    }
    :global(.borderInput) {
        @apply input input-bordered border-base-300;
    }
    :global(h1) {
        @apply text-5xl font-mono;
    }
    :global(h2) {
        @apply text-4xl font-mono;
    }
    :global(h3) {
        @apply text-3xl font-mono;
    }
    :global(h4) {
        @apply text-2xl font-mono;
    }
    :global(h5) {
        @apply text-xl font-mono;
    }
    :global(h6) {
        @apply text-lg font-mono;
    }
    :global(p) {
        @apply text-base font-mono;
    }
</style>

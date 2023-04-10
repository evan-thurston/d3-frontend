<script>
    let email,
        loading = false,
        emailSent = false;

    const signIn = () => {
        return;
    };
</script>

<nav>
    <form on:submit|preventDefault={signIn}>
        {#if !emailSent}
            <div>
                <input
                    id="1"
                    class="borderInput"
                    type="email"
                    placeholder="Your email"
                    bind:value={email}
                />
            </div>
            <div>
                <input
                    id="2"
                    class="disabledButton"
                    type="submit"
                    value={loading ? 'Loading' : 'Sign In'}
                    disabled={loading || true}
                />
            </div>
        {:else}
            <button class="disabledButton">
                check your email for a link to sign in
            </button>
            <button
                class="primaryButton"
                on:click={() => (emailSent = false)}>try again</button
            >
        {/if}
    </form>
</nav>

<style lang="postcss">
    nav {
        @apply fixed w-full top-0 p-8;
    }
    form {
        @apply flex flex-row space-x-4;
    }
</style>

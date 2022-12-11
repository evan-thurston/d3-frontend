<script>
    import { supabase } from "$lib/supabaseClient";

    let loading = false;
    let email;

    const handleLogin = async () => {
        try {
            loading = true;
            const { error } = await supabase.auth.signInWithOtp({ email });
            if (error) throw error;
            alert("Check your email for the login link!");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };
</script>

<form on:submit|preventDefault={handleLogin}>
    <div>
        <h1>Sign In</h1>
        <p>Sign in via magic link with your email below</p>
        <div>
            <input type="email" placeholder="Your email" bind:value={email} />
        </div>
        <div>
            <input
                type="submit"
                value={loading ? "Loading" : "Send magic link"}
                disabled={loading}
            />
        </div>
    </div>
</form>

<style lang="postcss">
    form {
        @apply flex flex-row justify-center mt-32 mb-8;
    }
    form > div {
        @apply flex flex-col space-y-4 items-center;
    }
    input[type="email"] {
        @apply input input-bordered input-primary w-full max-w-xs;
    }
    input[type="submit"] {
        @apply btn btn-primary;
    }
    h1 {
        @apply text-3xl
    }
    p {
        @apply text-sm
    }
</style>

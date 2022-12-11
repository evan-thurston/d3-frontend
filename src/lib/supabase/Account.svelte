<script>
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";

    import Avatar from "./Avatar.svelte";

    export let session;

    let loading = false;
    let username = null;
    let website = null;
    let avatarUrl = null;

    onMount(() => {
        getProfile();
    });

    const getProfile = async () => {
        try {
            loading = true;
            const { user } = session;

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`username, website, avatar_url`)
                .eq("id", user.id)
                .single();

            if (data) {
                username = data.username;
                website = data.website;
                avatarUrl = data.avatar_url;
            }

            if (error && status !== 406) throw error;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    };

    async function updateProfile() {
        try {
            loading = true;
            const { user } = session;

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url: avatarUrl,
                updated_at: new Date(),
            };

            let { error } = await supabase.from("profiles").upsert(updates);

            if (error) alert(error.message);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    }

    async function signOut() {
        try {
            loading = true;
            let { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        } finally {
            loading = false;
        }
    }
</script>

<form on:submit|preventDefault={updateProfile}>
    <div>
        <Avatar bind:url={avatarUrl} size={4} on:upload={updateProfile} />

        <div>
            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                value={session.user.email}
                disabled
            />
        </div>
        <div>
            <label for="username">Name</label>
            <input id="username" type="text" bind:value={username} />
        </div>
        <div>
            <label for="website">Website</label>
            <input id="website" type="website" bind:value={website} />
        </div>
        <div class="flex flex-row justify-between">
            <div>
                <input
                    type="submit"
                    value={loading ? "Loading..." : "Update"}
                    disabled={loading}
                />
            </div>

            <div>
                <button on:click={signOut} disabled={loading}>Sign Out</button>
            </div>
        </div>
    </div>
</form>

<style lang="postcss">
    form {
        @apply flex flex-row justify-center h-screen;
    }
    form > div {
        @apply flex flex-col space-y-4 my-auto;
    }
    input[type="email"],
    input[type="text"],
    input[type="website"] {
        @apply input input-bordered input-primary w-full max-w-xs;
    }
    input[type="submit"],
    button {
        @apply btn btn-primary;
    }
    h1 {
        @apply text-3xl;
    }
    p {
        @apply text-sm;
    }
</style>

<script>
  import { supabase } from "$lib/supabaseClient";
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";
  import "../app.postcss";

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      invalidate("supabase:auth");
    });

    return () => {
      subscription.unsubscribe();
    };
  });
</script>

<slot />

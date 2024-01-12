<script lang="ts">
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'

    onMount(async () => {
        await goto(`${$page.url.origin}/error?status=${$page.status}&message=${$page.error?.message}`)
    })
</script>
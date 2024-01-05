<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation'

    $: title = $page.url.searchParams.get('title')
    
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="container-fluid my-4">
    <h1 class="mb-3 text-center">{title}</h1>
    
    <slot />

    <div class="my-3">
        <button class="btn btn-primary" on:click={async () => await goto($page.url.origin)}>Get back</button>
    </div>
</div>
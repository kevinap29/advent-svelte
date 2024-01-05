<script lang="ts">
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    $: queryStatus = $page.url.searchParams.get('status')
    $: queryMessage = $page.url.searchParams.get('message')
    
</script>

<div class="container">
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card" style="width: 250px;">
            <div class="card-body text-center">
                <h1>{queryStatus}</h1>
                <p class="text-muted">{queryMessage}</p>
                <button class="btn btn-sm btn-primary" on:click={async () => await goto($page.url.origin)}>Get back</button>
            </div>
        </div>
    </div>
</div>
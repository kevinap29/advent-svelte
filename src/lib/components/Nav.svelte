<script lang="ts">
    import type { NavigationLink } from './@types'

    export let listNavLinks: NavigationLink[], url: URL
</script>

<div class="container-fluid">
    <nav class="nav flex-column">
        {#if listNavLinks.length > 0}
            {#each listNavLinks as navlink}
                <a class="nav-link {url.href === `${url.origin}/${navlink.url}` ? 'active' : ''}" href={`${navlink.url}?title=${navlink.title.split('|').at(1)?.trim()}`}>{navlink.title}</a>
            {/each}
        {/if}
    </nav>
</div>
<script lang="ts">
    import type { NavigationLink } from './@types'

    export let listNavLinks: NavigationLink[], url: URL
</script>

<div class="container-fluid">
    <nav class="nav flex-column">
        {#if listNavLinks.length > 0}
            {#each listNavLinks as navlink}
                <a 
                    class="nav-link {url.href.split('?').at(0) === `${url.origin}/${navlink.url}` ? 'bg-primary text-white rounded' : ''}" 
                    href={`${url.origin}/${navlink.url}`}
                >
                    {navlink.title}
                </a>
            {/each}
        {/if}
    </nav>
</div>
<script lang="ts">
    export let striped = false, hover = false
</script>

{#if (!striped && hover) || (striped && !hover)}
    <table class="table" class:table-striped={striped} class:table-hover={hover}>
        <thead>
            <tr>
                <slot name="thead" />
            </tr>
        </thead>
        <tbody>
            <slot name="tbody" />
        </tbody>
    </table>
{:else}
    <p>Table is not rendered</p>
{/if}
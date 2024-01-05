<script lang="ts">
    export let title: string, open: boolean = false
</script>

<div class="accordion" id="accordion-{title}">
    <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panel-{title}" aria-expanded={open} aria-controls="panel-{title}">
                <h5>{title}</h5>
            </button>
        </h2>
        <div id="panel-{title}" class="accordion-collapse collapse" class:show={open}>
            <div class="accordion-body">
                <slot />
            </div>
        </div>
    </div>
</div>
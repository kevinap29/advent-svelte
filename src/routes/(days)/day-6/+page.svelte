<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            Following the successful launch of the productivity dashboard for the Elves, Svelte Bot has proposed an exciting follow-up project to keep the North Pole workshop buzzing with energy and rhythm. This new challenge involves creating a Beats Per Minute (BPM) Counter, a tool that will enable the Elves to tap along to their favorite Christmas tunes while they work. This innovative counter will provide real-time feedback on the tempo of the music, with each tap by an Elf registering as a beat.
        </p>
        <p>
            The BPM Counter should dynamically calculate and display the BPM, updating instantly with each tap to match the current beat of the song. A reset button is essential, allowing the Elves to start a fresh count for each new tune. For an extra touch you could consider including a selection of classic Christmas songs into the system, perhaps through embedding YouTube videos. This feature will allow the Elves to choose a song and use your BPM counter to stay in sync with its rhythm, adding a musical twist to their festive productivity!
        </p>
        <p class="fw-bold">
            Dev notes: I don't want to make a solution in day 6, sorry 🙏
        </p>
    </Accordion>
</div>
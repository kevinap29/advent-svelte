<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import Table from "$lib/components/Table.svelte";
    import { ChildAndTally, type ChildAndTallyType } from "./utils";
    
    import type { PageServerData } from "./$types";

    export let data: PageServerData

    $: ({ listChild } = data)
    $:inputName = ''
    $:inputTally = ''

    const example: ChildAndTallyType[] = [
        { "name": "Emma", "tally": 32 },
        { "name": "Ethan", "tally": 14 },
        { "name": "Isabella", "tally": 70 },
        { "name": "Jayden", "tally": -16 },
        { "name": "Isabella", "tally": -59 },
        { "name": "Noah", "tally": 19 },
        { "name": "Mia", "tally": -37 },
        { "name": "Will", "tally": -20 },
        { "name": "Sam", "tally": -91 },
        { "name": "Brittney", "tally": -98 }
    ]

    async function clearInput() {
        inputName = ''
        inputTally = ''
    }

    async function inputNewChild() {
        listChild = [new ChildAndTally(inputName, parseInt(inputTally)).toJson(), ...listChild]

        await clearInput()
    }
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            The Elves have been tirelessly creating presents all year round. They're right on schedule, but today they've run into a big problem; the ancient system for tracking who's been naughty or nice is out of commission. With the hundreds of thousands of letters from children piling up alongside their records of good and bad deeds, the Elves are in dire need of a modern solution.
        </p>
        <p>
            Your mission is to build a system for the elves, enabling them to input names and tally each child deeds to keep track of whether they're good or bad. You could even categorize these automatically as “naughty” and “nice.” Fortunately, the elves have been meticulous in their record-keeping and have a backup of all the current data in JSON format. You'll need to import this data into your newly developed system.
        </p>
        <p>
            Here is an example of what the Elves have stored:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    [
                    {#each example as item}
                        {'{'} <span class="text-danger">"name"</span>: <span class="text-warning">"{item.name}"</span>, <span class="text-danger">"tally"</span>: <span class="text-warning">"{item.tally}"</span> {'}'}
                    {/each}
                        ...
                    ]
                </code>
            </div>
        </pre>
        <p>
            You can fetch this data by making a GET request to 
            <span>
                <a href="https://advent.sveltesociety.dev/data/2023/day-one.json">
                    https://advent.sveltesociety.dev/data/2023/day-one.json
                </a>
            </span>
        </p>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="row">
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="name" class="form-control" id="inputName" placeholder="Input name here..." bind:value={inputName}>
                    <label for="inputName">Input Name</label>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-floating mb-3">
                    <input type="tally" class="form-control" id="inputTally" placeholder="Input tally here..." bind:value={inputTally}>
                    <label for="inputTally">Input Tally</label>
                </div>
            </div>
            <div class="d-flex justify-content-center align-items-center">
                <button class="col-2 text-center btn btn-sm btn-success" on:click={async () => await inputNewChild()}>Save</button>
            </div>
        </div>

        <hr />
        
        <Table striped>
            <svelte:fragment slot="thead">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Tally</th>
                <th scope="col">Status</th>
            </svelte:fragment>

            <svelte:fragment slot="tbody">
                {#each listChild as child, index}
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{child.name}</td>
                        <td>{child.tally}</td>
                        <td>{child.status}</td>
                    </tr>
                {/each}
            </svelte:fragment>
        </Table>
    </Accordion>
</div>
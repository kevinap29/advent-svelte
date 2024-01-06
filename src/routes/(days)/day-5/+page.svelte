<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import Table from "$lib/components/Table.svelte";
    import { invalidateAll } from "$app/navigation";
    import { toDecimal, toDecimalString } from '$lib'

    import type { PageServerData } from './$types';
    import type { Task } from "./utils";
    
    export let data: PageServerData;

    $: ({ elfGroupingProductivity } = data)

    const example: Task[] = [
        {
            "elf": "Ashlynn",
            "task": "WRAPPED_PRESENT",
            "minutesTaken": 3,
            "date": "2024-01-05T00:3:00.000Z"
        },
        {
            "elf": "Ashlynn",
            "task": "CREATED_TOY",
            "minutesTaken": 15,
            "date": "2024-01-05T00:18:00.000Z"
        }
    ]
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            Despite the preparation for Christmas kicking off early in the year, the Elves are behind schedule. Santa, ever so reliant on their craftsmanship, turns to you for a solution. Svelte Bot, with its keen understanding of data-driven solutions, suggests building an “Elf Productivity Dashboard”.
        </p>
        <p>
            This dashboard, powered by Svelte's reactive magic, will provide real-time insights into the elves' workflow. There are two primary tasks that we're tracking, represented in the JSON data by “CREATED_TOY” and “WRAPPED_PRESENT”. You'll can tap into information such as the number of toys produced per hour, the time taken for each toy, and the elves' task completion rates. Your mission is to visualise this data in an engaging and interactive way, and show the data in realtime as it'll be changing throughout the day.
        </p>
        <p>
            Svelte Bot setup a JSON endpoint for you to get the live data, which updates every second: 
            <span>
                <a href="https://advent.sveltesociety.dev/data/2023/day-five.json">
                    https://advent.sveltesociety.dev/data/2023/day-five.json
                </a>
            </span>. Here is what that data looks like:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    [
                    {#each example as item, index}
                        {'{'} 
                            <span class="text-danger">"elf"</span>: <span class="text-warning">"{item.elf}"</span>, 
                            <span class="text-danger">"task"</span>: <span class="text-warning">"{item.task}"</span>, 
                            <span class="text-danger">"minutesTaken"</span>: <span class="text-warning">{item.minutesTaken}</span>, 
                            <span class="text-danger">"date"</span>: <span class="text-warning">"{item.date}"</span>, 
                        {'},'}
                    {/each}
                        ...
                    ]
                </code>
            </div>
        </pre>
        <p>
            Or as a TypeScript type:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    <span style="color: mediumorchid;">type</span> <span>TaskType</span> = <span class="text-info">'CREATED_TOY'</span> | <span class="text-info">'WRAPPED_PRESENT'</span>

                    <span style="color: mediumorchid;">interface</span> <span>Task</span> {'{'} 
                        <span class="text-danger">elf</span>: <span class="text-warning">string</span>, 
                        <span class="text-danger">task</span>: <span>TaskType</span>, 
                        <span class="text-danger">minutesTaken</span>: <span class="text-warning">number</span>, 
                        <span class="text-danger">date</span>: <span class="text-warning">string</span>, 
                    {'}'}
                </code>
            </div>
        </pre>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <Table striped>
            <svelte:fragment slot="thead">
                <th scope="col">#</th>
                <th scope="col">Elf</th>
                <th scope="col">Task</th>
                <th scope="col">Minutes</th>
                <th scope="col">Hours</th>
            </svelte:fragment>

            <svelte:fragment slot="tbody">
                {#each elfGroupingProductivity as productivity}
                    <tr>
                        <th scope="row">{productivity.id}</th>
                        <td>{productivity.elf}</td>
                        <td>{productivity.task}</td>
                        <td>{toDecimalString(productivity.minutesTaken)}</td>
                        <td>{toDecimalString(productivity.hoursTaken)}</td>
                        <!-- <td>
                            <button class="btn btn-sm btn-success" on:click={async () => addToSleigh(new ChildAndGiftWeight(child.id, child.name, toDecimal(child.weight)).toJson())}>{`Add =>`}</button>
                        </td> -->
                    </tr>
                {/each}
            </svelte:fragment> 
        </Table> 
    </Accordion>
</div>
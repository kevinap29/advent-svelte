<script lang="ts">
    import Accordion from '$lib/components/Accordion.svelte';
    import { getElfNameByName } from './utils';

    import type { PageServerData } from './$types';
    
    export let data: PageServerData;

    $: ({ listName } = data)
    $: fname = ''
    $: lname = ''
    $: result = ''

    async function handleGenerateElfName() {
        if (fname === '' || lname === '') {
            alert('Please insert your fullname!')

            return
        }

        const elfName = await getElfNameByName(fname, lname, listName)

        result = `${elfName.firstname} ${elfName.lastname}`
    }
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            In the midst of their bustling gift-making, the elves have come up with a delightful idea for you to tinker with: a Elf Name Generator! They’re thrilled with their idea but need a bit of tech magic to make it happen, which is where you come in.
        </p>
        <p>
            This tool will allow anyone to enter their “Human name” and receive a unique, elf-inspired name in return. It’s a wonderful way for people everywhere to feel connected to the magic of the North Pole!
        </p>
        <p>
            For example, if your human name is “Rich Harris”, your elf name could be something like “Peppermint Merryweather”. You’ll need to create an algorithm to match names. You could base this on the letters in the user’s name, their length, or even add a touch of randomness for extra fun. Once the user inputs their name and the generator works its magic, display their new elf name in a festive font.
        </p>
        <p>
            The Elves have collaborated with Svelte Bot to prepare a list of suitable Elf names that you can fetch here: 
            <span>
                <a href="https://advent.sveltesociety.dev/data/2023/day-eleven.json">
                    https://advent.sveltesociety.dev/data/2023/day-eleven.json
                </a>
            </span>
        </p>
        <p>
            The TypeScript type for this data is:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    <span style="color: mediumorchid;">interface</span> <span>NamesList</span> {'{'} 
                        <span class="text-danger">firstName</span>: <span class="text-warning">string[]</span>, 
                        <span class="text-danger">lastName</span>: <span class="text-warning">string[]</span>,
                    {'}'}
                </code>
            </div>
        </pre>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="container-fluid">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="firstName" placeholder="Your First Name" bind:value={fname}>
                <label for="firstName">First Name: </label>
            </div>

            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="lastName" placeholder="Your Last Name" bind:value={lname}>
                <label for="lastName">Last Name: </label>
            </div>

            <div class="d-flex justify-content-center align-items-center mb-3">
                <button class="btn btn-sm btn-primary text-white" on:click={async () => await handleGenerateElfName()}>Generate</button>
            </div>
            
            {#if result !== ''}
            <div class="card">
                <div class="card-body text-center">
                    <h1>Your Elf Name is: </h1>
                    <p class="display-5">{result}</p>
                </div>
            </div>
            {/if}
        </div>
    </Accordion>
</div>
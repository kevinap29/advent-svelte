<script lang="ts">
    import Accordion from "$lib/components/Accordion.svelte";
    import { MorsePlayer, decodeFromMorseCode, encodeToMorseCode } from './utils'

    $: viewObject = {
        inputMessage: '',
        inputMorse: '',
        isEncodeDecode: false
    }

    async function handleClearInput() {
        viewObject.inputMessage = ''
        viewObject.inputMorse = ''
        viewObject.isEncodeDecode = false
    }

    async function handleEncodeDecode() {
        if (viewObject.inputMessage === '' && viewObject.inputMorse === '') {
            alert('Please input message or morse first!')

            return
        }

        if (viewObject.inputMessage !== '' && viewObject.inputMorse !== '') {
            alert('Please input message or morse first!')

            return
        }
        
        if (viewObject.inputMessage !== '') {
            viewObject.inputMorse = encodeToMorseCode(viewObject.inputMessage)
            viewObject.isEncodeDecode = true

            return
        }

        if (viewObject.inputMorse !== '') {
            viewObject.inputMessage = decodeFromMorseCode(viewObject.inputMorse)
            viewObject.isEncodeDecode = true

            return
        }

        alert('Error: Please try again later')
    }

    async function handlePlayAudio() {
        if (viewObject.inputMessage === '') {
            alert('Error: Input message is empty!')

            return
        }

        await new MorsePlayer(viewObject.inputMessage).playAudio()
    }
</script>

<div class="row my-3">
    <Accordion title="Story" open>
        <p>
            Building on the success of the recent North Pole technological initiatives, Santa has encountered a unique communication challenge. He needs to connect with Sven, one of his top reindeer trainers based in Iceland. However, with the sleigh currently unavailable, Santa must resort to a more unconventional method of communication. Sven, known for his eccentric but effective training methods, swears by the use of Morse code, believing it keeps his reindeer more alert and attentive (he insists they respond better to beeps and boops).
        </p>
        <p>
            Your mission, should you choose to accept it, is to create a Morse Code Translator. The translator should have a text input and an output section that displays the corresponding Morse code translation. Fortunately, the all knowing Svelte bot has provided you with the international morse code alphabet above.
        </p>
        <p>
            Each letter and number can be translated into a sequence of dots (.) and dashes (-), with the space key represented by a forward slash (/). For example, “Hello World” can be written as:
        </p>
        <pre>
            <div class="container bg-dark text-light">
                <code>
                    <span class="text-white">.... . .-.. .-.. --- / .-- --- .-. .-.. -..</span>
                </code>
            </div>
        </pre>
        <p>
            A famous Elf engineer suggested that we could use the 
            <span>
                <a href="https://marcgg.com/blog/2016/11/01/javascript-audio/">
                    AudioContext
                </a>
            </span> API to generate audible bleeps and bloops to aid in the sending of the message. Svelte Bot found a recording of the message “Hello World” you could use as a reference:
        </p>
    </Accordion>
</div>

<div class="row my-3">
    <Accordion title="Solution">
        <div class="form-floating my-3">
            <textarea class="form-control" placeholder="Input message here" id="textMessage" style="height: 100px; resize: vertical;" bind:value={viewObject.inputMessage}></textarea>
            <label for="textMessage">Input Message</label>
        </div>
        <div class="d-flex justify-content-evenly align-items-center my-3">
            <button class="btn btn-primary text-white" on:click={async () => await handleEncodeDecode()}>🔐 Encode/Decode</button>
            <button class="btn btn-warning" on:click={async () => await handleClearInput()}>🧹 Clear Input</button>
            <button class="btn btn-danger text-white" disabled={!viewObject.isEncodeDecode} on:click={async () => await handlePlayAudio()}>▶️ Play Audio</button>
        </div>
        <div class="form-floating my-3">
            <textarea class="form-control" placeholder="Output message here" id="textMorse" style="height: 100px; resize: vertical;" bind:value={viewObject.inputMorse}></textarea>
            <label for="textMorse">Morse Code</label>
        </div>
    </Accordion>
</div>
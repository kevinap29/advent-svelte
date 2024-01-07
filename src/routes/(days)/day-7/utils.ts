import { delay } from '$lib'

const morseCodeMap: Record<string, string> = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
    "/": "-..-.",
    "&": ".-...",
    "'": ".----.",
    "@": ".--.-.",
    ")": "-.--.-",
    "(": "-.--.",
    ":": "---...",
    "=": "-...-",
    "-": "-....-",
    "+": ".-.-.",
    "*": "-..-",
    "%": "------..-.-----",
    '"': ".-..-.",
    " ": "/"
};

export function encodeToMorseCode(text: string): string {
    const chars = text.toUpperCase().split("");
    const morseCode = chars.map(char => morseCodeMap[char] || "").join(" ");

    return morseCode;
}

export function decodeFromMorseCode(morseCode: string): string {
    const chars = morseCode.split(" ").map(symbol => {
    const char = Object.keys(morseCodeMap).find(key => morseCodeMap[key] === symbol);

    return char || "";
    });

    const text = chars.join("");

    return text;
}

export class MorsePlayer {
    private text: string
    private textSplit: string[]

    // option for oscillator 
    private frequency: number = 554.4
    private type: OscillatorType = 'sine'

    constructor(text: string) {
        this.text = text
        this.textSplit = text.split('')
    }

    public async playAudio() {
        // this.textSplit.forEach(async a => {
        //     await this.mapAudio(a)
        //     await delay(1000)
        // })

        for await (const chars of this.textSplit) {
            await this.mapAudio(chars)
        }
    }

    private async mapAudio(str: string) {
        switch (str.toUpperCase()) {
            case ' ':
                await delay(250)
                break;
            case 'A':
                await this.playMorse_A()
                break;
            case 'B':
                await this.playMorse_B()
                break;
            case 'C':
                await this.playMorse_C()
                break;
            case 'D':
                await this.playMorse_D()
                break;
            case 'E':
                await this.playMorse_E()
                break;
            case 'F':
                await this.playMorse_F()
                break;
            case 'G':
                await this.playMorse_G()
                break;
            case 'H':
                await this.playMorse_H()
                break;
            case 'I':
                await this.playMorse_I()
                break;
            case 'J':
                await this.playMorse_J()
                break;
            case 'K':
                await this.playMorse_K()
                break;
            case 'L':
                await this.playMorse_L()
                break;
            case 'M':
                await this.playMorse_M()
                break;
            case 'N':
                await this.playMorse_N()
                break;
            case 'O':
                await this.playMorse_O()
                break;
            case 'P':
                await this.playMorse_P()
                break;
            case 'Q':
                await this.playMorse_Q()
                break;
            case 'R':
                await this.playMorse_R()
                break;
            case 'S':
                await this.playMorse_S()
                break;
            case 'T':
                await this.playMorse_T()
                break;
            case 'U':
                await this.playMorse_U()
                break;
            case 'V':
                await this.playMorse_V()
                break;
            case 'W':
                await this.playMorse_W()
                break;
            case 'X':
                await this.playMorse_X()
                break;
            case 'Y':
                await this.playMorse_Y()
                break;
            case 'Z':
                await this.playMorse_Z()
                break;
            case '0':
                await this.playMorse_0()
                break;
            case '1':
                await this.playMorse_1()
                break;
            case '2':
                await this.playMorse_2()
                break;
            case '3':
                await this.playMorse_3()
                break;
            case '4':
                await this.playMorse_4()
                break;
            case '5':
                await this.playMorse_5()
                break;
            case '6':
                await this.playMorse_6()
                break;
            case '7':
                await this.playMorse_7()
                break;
            case '8':
                await this.playMorse_8()
                break;
            case '9':
                await this.playMorse_9()
                break;
            case '&':
                await this.playMorse_Ampersand()
                break;
            case "'":
                await this.playMorse_Apostrophe()
                break;
            case '@':
                await this.playMorse_AtSign()
                break;
            case ')':
                await this.playMorse_BracketClose()
                break;
            case '(':
                await this.playMorse_BracketOpen()
                break;
            case ':':
                await this.playMorse_Colon()
                break;
            case ',':
                await this.playMorse_Comma()
                break;
            case '=':
                await this.playMorse_Equal()
                break;
            case '!':
                await this.playMorse_Exclamation()
                break;
            case '.':
                await this.playMorse_FullStop()
                break;
            case '*':
                await this.playMorse_Multiplication()
                break;
            case '%':
                await this.playMorse_Percentage()
                break;
            case '+':
                await this.playMorse_Plus()
                break;
            case '"':
                await this.playMorse_Quotation()
                break;
            case '?':
                await this.playMorse_Question()
                break;
            case '/':
                await this.playMorse_Slash()
                break;
        
            default:
                await this.playMorse_Error()
                break;
        }
    }

    private async playDot() {
        const context = new AudioContext()
        const o = context.createOscillator()
        const g = context.createGain()

        o.connect(g)
        g.connect(context.destination)

        o.type = this.type
        o.frequency.value = this.frequency

        o.start(0)
        g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + .50)

        await delay(115)
    }

    private async playBeep() {
        const context = new AudioContext()
        const o = context.createOscillator()
        const g = context.createGain()

        o.connect(g)
        g.connect(context.destination)

        o.type = this.type
        o.frequency.value = this.frequency

        o.start(0)
        g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2)

        await delay(200)
    }

    private async playMorse_A() {
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_B() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_C() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }

    private async playMorse_D() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_E() {
        await this.playDot()
    }

    private async playMorse_F() {
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }

    private async playMorse_G() {
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
    }

    private async playMorse_H() {
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_I() {
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_J() {
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
    }

    private async playMorse_K() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_L() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_M() {
        await this.playBeep()
        await this.playBeep()
    }
    
    private async playMorse_N() {
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_O() {
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
    }
    
    private async playMorse_P() {
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_Q() {
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
    }
    
    private async playMorse_R() {
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_S() {
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }
    
    private async playMorse_T() {
        await this.playBeep()
    }
    
    private async playMorse_U() {
        await this.playDot()
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_V() {
        await this.playDot()
        await this.playDot()
        await this.playBeep()
    }
    
    private async playMorse_W() {
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
    }
    
    private async playMorse_X() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
    }
    
    private async playMorse_Y() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
    }
    
    private async playMorse_Z() {
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_0() {
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
    }

    private async playMorse_1() {
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
    }

    private async playMorse_2() {
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
    }

    private async playMorse_3() {
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
    }

    private async playMorse_4() {
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_5() {
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }
    
    private async playMorse_6() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_7() {
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_8() {
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_9() {
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_Error() {
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }
    
    private async playMorse_Ampersand() {
        await this.playDot()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }
    
    private async playMorse_Apostrophe() {
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
    }

    private async playMorse_AtSign() {
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }

    private async playMorse_BracketClose() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
    }
    
    private async playMorse_BracketOpen() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_Colon() {
        await this.playBeep()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
    }
    
    private async playMorse_Comma() {
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
    }
    
    private async playMorse_Equal() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_Exclamation() {
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
    }
    
    private async playMorse_FullStop() {
        await this.playDot()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
    }

    private async playMorse_Hyphen() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
    }
    
    private async playMorse_Multiplication() {
        await this.playMorse_X()
    }
    
    private async playMorse_Percentage() {
        await this.playMorse_0()
        await this.playMorse_Slash()
        await this.playMorse_0()
    }

    private async playMorse_Plus() {
        await this.playDot()
        await this.playBeep()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_Quotation() {
        await this.playDot()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }
    
    private async playMorse_Question() {
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playBeep()
        await this.playDot()
        await this.playDot()
    }

    private async playMorse_Slash() {
        await this.playBeep()
        await this.playDot()
        await this.playDot()
        await this.playBeep()
        await this.playDot()
    }
}
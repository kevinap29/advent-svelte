import { dateTimeStore } from '$lib'
import { readable, type Readable } from "svelte/store";

interface ChristmasCountdown {
    readonly countdown: Readable<number>
    readonly date: number
    readonly month: number
}

export const christmasCountdownStore = readable<ChristmasCountdown>({
    countdown: dateTimeStore,
    date: 25,
    month: 12
})
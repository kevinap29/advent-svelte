import { writable } from "svelte/store"

export interface SantaHeartRate {
    heartRate: number
}

function getSantaHeartRate() {
    const init: SantaHeartRate[] = []
    const { subscribe, update } = writable(init)

    return {
        subscribe, update
    }
}

export const santaHeartRateStore = getSantaHeartRate()
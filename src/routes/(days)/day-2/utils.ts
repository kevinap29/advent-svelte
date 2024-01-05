import { writable } from 'svelte/store'

function getCookiesCounter() {
    const { subscribe, update } = writable(0)

    return {
        subscribe, update
    }
}

export const cookiesCounterStore = getCookiesCounter()

function getShowCounter() {
    const { subscribe, update, set } = writable(false)

    return {
        subscribe, update, updateState: () => update(store => !store), set
    }
}

export const showCounterStore = getShowCounter()
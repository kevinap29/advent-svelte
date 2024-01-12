import Enumerable from 'linq'
import { dateTimeStore } from '$lib'
import { writable, readable, derived, type Readable } from 'svelte/store'

//#region SantaDeck
type SantaDeckState = 'open' | 'close'

interface SantaDeck {
    id: number
    url: string
    placeholder: string
    state: SantaDeckState
}

const _santaDeck: SantaDeck[] = []

function getSantaDeck() {
    const { subscribe, update } = writable(_santaDeck)

    return {
        subscribe, 
        update,
        shuffle: () => {
            update(store => {
                return Enumerable.from(store).shuffle().toArray()
            })
        },
        openWhereId: (id: number) => {
            update(store => {
                return Enumerable.from(store).select(a => {
                    if (a.id === id) a.state = 'open'

                    return a
                }).toArray()
            })
        },
        closeWhereId: (id: number) => {
            update(store => {
                return Enumerable.from(store).select(a => {
                    if (a.id === id) a.state = 'close'

                    return a
                }).toArray()
            })
        },
        openAll: () => {
            update(store => {
                return Enumerable.from(store).select(a => {
                    a.state = 'open'

                    return a
                }).toArray()
            })
        },
        closeAll: () => {
            update(store => {
                return Enumerable.from(store).select(a => {
                    a.state = 'close'

                    return a
                }).toArray()
            })
        },
        openWhereIndex: (index: number) => {
            update(store => {
                store[index].state = 'open'

                return store
            })
        },
        closeWhereIndex: (index: number) => {
            update(store => {
                store[index].state = 'close'

                return store
            })
        },
    }
}

export const santaDeckStore = getSantaDeck()
//#endregion

//#region 
type PlayerPick = {
    id: number
    index: number
}

interface SantaDeckGameHandler {
    playerPick: PlayerPick
    time: Readable<number>
    winningTime: number
    isWinning: boolean
    activeCheat: boolean
}

const _handler: SantaDeckGameHandler = {
    playerPick: { id: 0, index: 0 },
    time: readable(0),
    winningTime: 0,
    isWinning: false,
    activeCheat: false
}

function getSantaDeckGameHandler() {
    const { subscribe, update } = writable(_handler)
    const validatePick = (id: number) => {
        if (id < 1 && id > 24) return false

        return true
    }

    return {
        subscribe,
        update,
        startGame: () => {
            update(store => {
                const start = new Date().getTime()
                store.time = derived<Readable<number>, number>(dateTimeStore, ($time: number) => Math.round(($time - start) / 1000))

                return store
            })
        },
        resetGame: () => {
            update(store => {
                store.time = readable(0)
                store.isWinning = false
                store.winningTime = 0
                store.activeCheat = false

                santaDeckStore.closeAll()

                return store
            })
        },
        setWinning: () => {
            update(store => {
                store.time.subscribe(t => {
                    store.winningTime = t
                    store.isWinning = true
                })
                
                return store
            })
        },
        setPick: (id: number, index: number) => {
            update(store => {
                if (!validatePick(id)) return store
                
                store.playerPick.id = id
                store.playerPick.index = index
                
                return store
            })
        },
        resetPick: () => {
            update(store => {
                store.playerPick = {
                    id: 0,
                    index: 0
                }

                return store
            })
        },
        activeCheat: () => {
            update(store => {
                store.activeCheat = true
                
                return store
            })
        }
    }
}

export const santaDeckGameHandlerStore = getSantaDeckGameHandler()
//#endregion
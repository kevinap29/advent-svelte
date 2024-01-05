export interface ChildAndTallyType {
    name: string
    tally: number
}

export class ChildAndTally implements ChildAndTallyType {
    public name: string
    public tally: number
    public status: string

    constructor(name: string, tally: number) {
        this.name = name
        this.tally = tally
        this.status = this.tally > 0 ? 'Nice' : 'Naughty' 
    }

    public toJson() {
        return { ...this }
    }
}
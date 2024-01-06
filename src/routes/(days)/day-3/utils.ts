export interface ChildAndGiftWeightType {
    name: string
    weight: number
}

export class ChildAndGiftWeight implements ChildAndGiftWeightType {
    public id: number
    public name: string
    public weight: number
    
    constructor(id: number, name: string, weight: number) {
        this.id = id
        this.name = name
        this.weight = weight
    }

    public toJson() {
        return { ...this }
    }
}
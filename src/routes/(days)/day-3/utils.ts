export interface ChildAndGiftWeightType {
    name: string
    weight: number
}

export class ChildAndGiftWeight implements ChildAndGiftWeightType {
    public name: string
    public weight: number
    
    constructor(name: string, weight: number) {
        this.name = name
        this.weight = weight
    }

    public toJson() {
        return { ...this }
    }
}
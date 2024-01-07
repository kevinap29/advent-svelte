import { toDecimal } from "$lib";

export type TaskType = 'CREATED_TOY' | 'WRAPPED_PRESENT'

export interface Task {
	elf: string
	task: TaskType
	minutesTaken: number
    date: string;
}

export interface ITaskGrouping extends Omit<Task, 'date'> {
	id: number
	hoursTaken: number
}

export interface AggregateTaskProduction {
	countCreatedToys: number
	countWrappedPresent: number
	avgCreatedToysMinutes: number
	avgWrappedPresentMinutes: number
	avgCreatedToysHours: number
	avgWrappedPresentHours: number
	sumCreatedToysMinutes: number
	sumWrappedPresentMinutes: number
	sumCreatedToysHours: number
	sumWrappedPresentHours: number
}

export interface ViewObjectDay5 {
	listTaskType: Array<TaskType | 'ALL'>
	selectedListTaskType: TaskType | 'ALL'
	aggregateListTask: AggregateTaskProduction
}

export class TaskGrouping implements ITaskGrouping {
	public id: number
	public hoursTaken: number;
	public elf: string;
	public task: TaskType;
	public minutesTaken: number;
	
	constructor(id: number, elf: string, task: TaskType, minutes: number) {
		this.id = id
		this.elf = elf
		this.task = task
		this.minutesTaken = minutes
		this.hoursTaken = toDecimal(minutes/60)
	}

	public toJson() {
		return { ...this }
	}
}
export interface IResponse<T> {
    status: number
    message: string
    value: T
}
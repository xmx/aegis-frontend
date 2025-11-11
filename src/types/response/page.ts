export type Page<T> = {
    page: number
    size: number
    count: number
    records: T[]
}

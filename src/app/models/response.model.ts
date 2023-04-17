export interface Response<T> {
    page: number,
    size: number,
    data: T[],
    totalPages: number,
    totalItems: number,
}
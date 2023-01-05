export interface PaginatedList<T> {
    items: T[]
    pageNumber: number
    totalPages: number
    totalCount: number
    hasPreviousPage: boolean
    hasNextPage: boolean
}


export interface DialogProps {
    open: boolean,
    handleOpen: VoidFunction
}
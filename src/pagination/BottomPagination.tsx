import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { PaginatedList } from '../types';
import { useSearchParams } from 'react-router-dom';

interface BottomPaginationProps {
    paging: PaginatedList<unknown>
}

export default function BottomPagination(props: BottomPaginationProps) {
    const [_, setSearchParams] = useSearchParams();
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSearchParams(prev => ({ "pageNumber": value.toString() }))
    };

    return (
        <Pagination count={props.paging.totalPages} page={props.paging.pageNumber} onChange={handleChange} />
    );
}
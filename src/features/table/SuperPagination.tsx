import React, {FC} from 'react';
import {TablePaginationActions} from "./TablePaginationActions";
import TablePagination from "@mui/material/TablePagination";

type SuperPaginationPropsType = {
    rowsPerPageOptions: number[],
    totalCount: number
    pageCount: number
    page: number
    onPageChange: (event: unknown, newPage: number) => void
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SuperPagination: FC<SuperPaginationPropsType> =
    ({
         onRowsPerPageChange,
         rowsPerPageOptions,
         totalCount,
         pageCount,
         page,
         onPageChange
     }) => {
        return <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={totalCount}
            rowsPerPage={pageCount}
            page={page - 1}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            ActionsComponent={TablePaginationActions}
        />
    }
;


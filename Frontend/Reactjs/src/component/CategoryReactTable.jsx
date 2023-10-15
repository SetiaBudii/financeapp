import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const CategoryReactTable = ({ allCategory,handleDeleteClick, handleClick}) => {
    const columns = useMemo(
        () => [
            {
                name: 'Date',
                selector: row => row.time_stamp,
                cell: (row) => formatDateDDMMYYYY(row.time_stamp),
            },
            {
                name: 'Wallet',
                selector: row => row.wallet.tipe,
            },
            {
                name: 'Amount',
                selector: row => row.amount,
                sortable: true,
                cell: (row) => formatterIDR.format(row.amount),
            },
            {
                name: 'Action',
                selector: row => row.id_outcome,
                cell: (row) => <button className="btn btn-danger btn-sm" data-id={row.id_outcome} data-toggle="modal" data-target="#deleteoutcomemodal" onClick={() => handleDeleteClick(row.id_outcome)}>Delete</button>,
            },
        ],
        []
    );

    return (
        <>
            <div className="table-responsive">
                <DataTable 
                    columns={columns}
                    data={allOutcome}
                    noHeader
                    fixedHeader
                    fixedHeaderScrollHeight="300px"
                    highlightOnHover
                />
            </div>
        </>
    )
}

export default CategoryReactTable

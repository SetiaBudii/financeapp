    import React, { useMemo } from 'react';
    import DataTable from 'react-data-table-component';

    const OutcomeReactTable = ({ allOutcome,handleDeleteClick }) => {
        const isMobileView = window.innerWidth <= 600; // Adjust the pixel width as needed
        const columns = useMemo(
            () => [
                {
                    name: 'Date',
                    selector: row => row.time_stamp,
                    cell: (row) => formatDateDDMMYYYY(row.time_stamp),
                    sortable: true,
                    style: isMobileView ? {
                        paddingRight: '0px',
                        paddingLeft: '5px',
                        marginLeft: '0px',
                    } : {
                        
                    },
                },
                {
                    name: 'Wallet',
                    selector: row => row.wallet.tipe,
                    sortable: true,
                },
                {
                    name: 'Amount',
                    selector: row => row.amount,
                    sortable: true,
                    cell: (row) => formatterIDR.format(row.amount),
                    style: {
                        marginLeft: '0px',
                        paddingLeft: '0px',
                    },
                    width: '25%',
                },
                {
                    name: 'Category',
                    selector: row => row.kategori.nama_kategori,
                    sortable: true,
                    cell: (row) =>  row.kategori.nama_kategori,
                    style: {
                        marginLeft: '0px',
                        paddingLeft: '10px',
                    },
                },
                {
                    name: 'Action',
                    selector: row => row.id_outcome,
                    cell: (row) => <button className="btn btn-danger btn-sm" data-id={row.id_outcome} data-toggle="modal" data-target="#deleteoutcomemodal" onClick={() => handleDeleteClick(row.id_outcome)}><i className="fas fa-trash" style= {{'color': '#fff'}}></i></button>,
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
                        highlightOnHover
                        noHeader
                        pagination
                    />
                </div>
            </>
        )
    }

    export default OutcomeReactTable

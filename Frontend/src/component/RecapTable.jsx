
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const RecapTable = ({ data }) => {
    console.log(data);
    const columns = useMemo(
        () => [
            {
                name: 'Date',
                selector: row => row.date,
                cell: (row) => formatDateDDMMYYYY(row.date),
            },
            {
                name: 'Wallet',
                selector: row => row.tipewallet,
            },
            {
                name: 'Total Amount',
                selector: row => row.amount,
                sortable: true,
                cell: (row) => formatterIDR.format(row.amount),
            },
        ],
        []
    );

    const totalAmount = data.reduce((total, datarecap) => total + datarecap.amount, 0);

    return (
        <>

            <DataTable
                columns={columns}
                data={data}
                noHeader
                fixedHeader
                fixedHeaderScrollHeight="300px"
                highlightOnHover
            />
            <button className="btn btn-primary mt-3" >Total: {totalAmount}</button>
        </>
    );
};

export default RecapTable;

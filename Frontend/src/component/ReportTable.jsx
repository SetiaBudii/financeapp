
import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const ReportTable = ({ data }) => {
    // console.log(data);
    // Filter data where amount > 0
    const filteredData = data.filter((row) => row.amount > 0);
    const columns = useMemo(
        () => [
            {
                name: 'Date',
                selector: row => row.time_stamp,
                cell: (row) => formatDateDDMMYYYY(row.time_stamp),
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
                data={filteredData}
                noHeader
                fixedHeader
                fixedHeaderScrollHeight="300px"
                highlightOnHover
            />
            <button className="btn btn-primary mt-3" >Total: {totalAmount}</button>
        </>
    );
};

export default ReportTable;


import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const ReportTable = ({ data, type }) => {
    console.log(data);
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
            {type == "income" ?
                <div className="d-flex justify-content-center mt-3 fw-bold" style={{ fontSize: '15px',color:'black'}} ><i className="fas fa-plus-circle mx-1 my-1 text-success"></i><u>Total Income: {formatterIDR.format(totalAmount)}</u></div>
                : <div className="d-flex justify-content-center mt-3" style={{ fontSize: '15px',color:'black' }} ><i className="fas fa-minus-circle mx-1 my-1 text-danger"></i><u>Total Outcome: {formatterIDR.format(totalAmount)}</u></div>
            }
        </>
    );
};

export default ReportTable;

import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const IncomeReactTable = ({ allIncome,handleDeleteClick }) => {
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
                width: '30%',
            },
            {
                name: 'Action',
                selector: row => row.id_income,
                cell: (row) => <button className="btn btn-danger btn-sm" data-id={row.id_income} data-toggle="modal" data-target="#deleteincomemodal" onClick={() => handleDeleteClick(row.id_income)}><i className="fas fa-trash" style= {{'color': '#fff'}}></i></button>,
            },
        ],
        []
    );

    return (
        <>
            <div className="table-responsive">
                <DataTable 
                    columns={columns}
                    data={allIncome}
                    highlightOnHover
                    noHeader
                    pagination
                />
            </div>
        </>
    )
}

export default IncomeReactTable

// import React from 'react'

// const IncomeReactTable = ({allIncome,handleDeleteClick}) => {
//     console.log(allIncome)
//     return (
//         <>
//             <div className="table-responsive">
//                 <table className="table table-bordered text-center" id="dataTable">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Wallet</th>
//                             <th>Amount</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {allIncome && allIncome.map((income) => (
//                             <tr key={income.id_income}>
//                                 <td>{formatDateDDMMYYYY(income.time_stamp)}</td>
//                                 <td>{income.wallet.tipe}</td>
//                                 <td className='text-right'>{formatterIDR.format(income.amount)}</td>
//                                 <td><button className="btn btn-danger btn-sm" data-id={income.id_income} data-toggle="modal" data-target="#deleteincomemodal" onClick={() => handleDeleteClick(income.id_income)}>Delete</button></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     )
// }

// export default IncomeReactTable;
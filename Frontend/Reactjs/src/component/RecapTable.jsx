// import React, { useEffect,useRef } from 'react'
// import DataTable from 'react-data-table-component';

// const RecapTable = ({ data }) => {

//     const columns = [
//         {
//             name: 'Date',
//             selector: row => row.date,
//         },
//         {
//             name: 'Wallet',
//             selector: row => row.tipewallet,
//         },
//         {
//             name: 'Total Amount',
//             selector: row => row.amount,
//             sortable: true,
//             right: true,
//         },
//     ];


//     const totalAmount = data.reduce((total, datarecap) => total + datarecap.amount, 0);
//     return (
//         <>
//             <div className="table-responsive">
//                 <table className="table table-bordered text-center" id="mytable">
//                     <thead>
//                         <tr>
//                             <th>Date</th>
//                             <th>Wallet</th>
//                             <th>Total Amount</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {data && data.map((datarecap) => (
//                             <tr key={datarecap.tipewallet}>
//                                 <td>{formatDateDDMMYYYY(datarecap.date)}</td>
//                                 <td>{datarecap.tipewallet}</td>
//                                 <td className='text-right'>{formatterIDR.format(datarecap.amount)}</td>
//                             </tr>
//                         ))}

//                         <tr className='bg-gray-200'>
//                             <td colSpan={2} className='font-weight-bold'>Total:</td>
//                             <td className="text-right font-weight-bold" >{formatterIDR.format(totalAmount)}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//             <br/>
//             <div className="table-responsive">
//                 <DataTable
//                     columns={columns}
//                     data={data}
//                     pagination
//                     paginationPerPage={5}
//                     paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
//                     paginationComponentOptions={{ rowsPerPageText: 'data per page:' }}
//                     noHeader
//                     fixedHeader
//                     fixedHeaderScrollHeight="300px"
//                     highlightOnHover
//                 />
//             </div>
//         </>
//     )
// }

// export default RecapTable

import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';

const RecapTable = ({ data }) => {
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
            <div className="table-responsive">
                <table className="table table-bordered text-center" id="mytable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Wallet</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((datarecap) => (
                            <tr key={datarecap.tipewallet}>
                                <td>{formatDateDDMMYYYY(datarecap.date)}</td>
                                <td>{datarecap.tipewallet}</td>
                                <td className='text-right'>{formatterIDR.format(datarecap.amount)}</td>
                            </tr>
                        ))}

                        <tr className='bg-gray-200'>
                            <td colSpan={2} className='font-weight-bold'>Total:</td>
                            <td className="text-right font-weight-bold" >{formatterIDR.format(totalAmount)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
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

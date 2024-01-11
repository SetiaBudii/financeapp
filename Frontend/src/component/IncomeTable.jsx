import React from 'react'

const IncomeTable = ({allIncome,handleDeleteClick}) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered text-center" id="dataTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Wallet</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allIncome && allIncome.map((income) => (
                            <tr key={income.id_income}>
                                <td>{formatDateDDMMYYYY(income.time_stamp)}</td>
                                <td>{income.wallet.tipe}</td>
                                <td className='text-right'>{formatterIDR.format(income.amount)}</td>
                                <td><button className="btn btn-danger btn-sm" data-id={income.id_income} data-toggle="modal" data-target="#deleteincomemodal" onClick={() => handleDeleteClick(income.id_income)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default IncomeTable
import React from 'react'

const IncomeTable = ({allIncome}) => {
    console.log(allIncome)
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered text-center" id="dataTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Wallet</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allIncome && allIncome.map((income) => (
                            <tr key={income.id_income}>
                                <td>{formatDateDDMMYYYY(income.time_stamp)}</td>
                                <td>{income.wallet.tipe}</td>
                                <td className='text-right'>{formatterIDR.format(income.amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default IncomeTable
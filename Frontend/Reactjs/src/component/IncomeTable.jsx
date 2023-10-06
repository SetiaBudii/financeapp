import React from 'react'

const IncomeTable = ({allIncome}) => {
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered text-center" id="dataTable">
                    <thead>
                        <tr>
                            <th>Wallet</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allIncome && allIncome.map((income) => (
                            <tr key={income.incomeId}>
                                <td>{income.tipewallet}</td>
                                <td className='text-right'>{formatterIDR.format(income.income)}</td>
                                <td>{formatDateDDMMYYYY(income.tanggal)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default IncomeTable
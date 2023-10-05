import React from 'react'
import IdWallett from './IdWallet'

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
                            <tr key={income.id_income}>
                                <td><IdWallett id={income.id_wallet} /></td>
                                <td className='text-right'>{formatterIDR.format(income.amount)}</td>
                                <td>{formatDateDDMMYYYY(income.time_stamp)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default IncomeTable
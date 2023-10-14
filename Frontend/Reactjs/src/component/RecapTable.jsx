import React from 'react'

const RecapTable = ({ data }) => {
    const totalAmount = data.reduce((total, datarecap) => total + datarecap.amount, 0);
    return (
        <>
            <div className="table-responsive">
                <table className="table table-bordered text-center" id="dataTable">
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
        </>
    )
}

export default RecapTable
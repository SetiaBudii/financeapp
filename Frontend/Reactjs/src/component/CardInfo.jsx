import React from 'react'
import { useState } from 'react';
import WalletTypeDropdown from './WalletDropdown';

const CardInfo = () => {

    const [selectedWalletId,setSelectedWalletId] = useState('');

    const handleWalletChange = (value) => {
        setSelectedWalletId(value);
      };
    
    

    return (
        <>

            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                </div>
                <div className="row " >
                    <div className="col-lg-4 col-md-6 mb-4  ">
                        <div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Saldo Wallet</h6>
                                <div class="dropdown no-arrow">
                                    <div class="dropdown-menu"
                                        aria-labelledby="dropdownMenuLink">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                            <WalletTypeDropdown onWalletChange={handleWalletChange}/>
                                <div className="card shadow py-2 mt-3">
                                    <div className="card-body mb-1">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-wallet fa-2x text-gray-700"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Category</h6>
                                <div class="dropdown no-arrow">
                                    <div class="dropdown-menu"
                                        aria-labelledby="dropdownMenuLink">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                            <WalletTypeDropdown onWalletChange={handleWalletChange}/>
                                <div className="card shadow py-2 mt-3">
                                    <div className="card-body mb-1">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-wallet fa-2x text-gray-700"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-4  ">
                        <div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Today's Recap</h6>
                                <div class="dropdown no-arrow">
                                    <div class="dropdown-menu"
                                        aria-labelledby="dropdownMenuLink">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="far fa-plus-square fa-2x text-success"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas far fa-minus-square fa-2x text-danger"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardInfo;
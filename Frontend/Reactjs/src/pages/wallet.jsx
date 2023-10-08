import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import ShowTipe from '../component/ShowTipe';
import WalletComp from '../component/WalletComp';

const Wallet = () => {
    const [allWallet, setAllWallet] = useState([]);
    const [username, setUsername] = useState('');
    const [isCreateWalletModalOpen, setCreateWalletModalOpen] = useState(false);
    const [selectedTipe, setSelectedTipe] = useState('');

    useEffect(() => {
        const storedUsername = Cookies.get('username')
        if (storedUsername) {
            setUsername(storedUsername)
            loadKategori(storedUsername)
        }
    }, []);

    const loadKategori = async (x) => {
        try {
            const result = await axios.get(`http://localhost:5000/wallets/${x}`, { validateStatus: false });
            setAllWallet(result.data.data);
        } catch (error) {
            console.error("Error loading outcome data:", error);
        }
    }

    const handleCreateWalletClick = () => {
        // Open the Create Wallet modal
        setCreateWalletModalOpen(true);
    }

    const handleCreateWalletModalClose = () => {
        // Close the Create Wallet modal
        setCreateWalletModalOpen(false);
    }

    const handleTipeChange = (value) => {
        setSelectedTipe(value);
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <button onClick={handleCreateWalletClick} className="btn btn-primary">Create Wallet</button>
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4 mt-5">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary text-center">Wallet</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered text-center" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>Tipe</th>
                                                    <th>Saldo</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allWallet && allWallet.map((wallet) => (
                                                    <tr key={wallet.username}>
                                                        <td>{wallet.tipe}</td>
                                                        <td>{wallet.saldo}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isCreateWalletModalOpen && (
                // Modal backdrop and Create Wallet modal
                <div className="modal-backdrop show" style={{ zIndex: 1040 }}>
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', zIndex: 1050 }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Create Wallet</h5>
                                    <button type="button" className="close" onClick={handleCreateWalletModalClose}>
                                        <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {/* ShowTipe component for selecting wallet type */}
                                    <ShowTipe onTipeChange={handleTipeChange} />

                                    {/* WalletComp component for creating the wallet */}
                                    <WalletComp username={username} selectedTipe={selectedTipe} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Wallet;

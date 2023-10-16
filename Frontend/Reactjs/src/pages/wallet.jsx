import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie"

const Wallet = () => {
    const [allWallet, setAllWallet] = useState([]);
    const [username, setUsername] = useState('');
  
    // const [newKategori, setNewKategori] = useState({
    //     nama_kategori: 0,
    //     budget: 0,
    //     username: "",
    //     id_kategori: 0,
    // });

    useEffect(() => {
        const storedUsername = Cookies.get('username')
        if (storedUsername) {
            setUsername(storedUsername)
            console.log('Stored Username:', storedUsername);
            console.log(' Username:', username);
            loadKategori(storedUsername)
        }

        
    }, []);

    const loadKategori = async (x) => {
        try {
            const result = await axios.get(`http://localhost:5000/wallets/${x}`, { validateStatus: false });
            setAllWallet(result.data.data);
            console.log(result.data.data);
            console.log(`http://localhost:5000/wallets/${x}`);
        } catch (error) {
            console.error("Error loading outcome data:", error);
        }
    }

    

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4 mt-5">
                                <div className="card-header py-3">
                                    <div className="row">
                                        <div className="col">
                                        <h6 className="m-0 font-weight-bold text-primary text-center">Wallet</h6>
                                        </div>
                                        <div className="col">

                                        </div>
                                    </div>
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
                                                    <td className="text-right">{wallet.saldo.toLocaleString('de-DE')}</td>
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
            
            {/* <div className="modal fade" id="addoutcomemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add income</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">                            
                        <form onSubmit={AddNewOutcome}>
                            <div className="form-group">
                                <label htmlFor="id_wallet">Id Wallet</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="id_wallet"
                                    name="id_wallet"
                                    value={newOutcome.id_wallet}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    name="amount"
                                    value={newOutcome.amount}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time_stamp">ID Kategori</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="id_kategori"
                                    name="id_kategori"
                                    value={newOutcome.id_kategori}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time_stamp">Time Stamp</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="time_stamp"
                                    name="time_stamp"
                                    value={newOutcome.time_stamp}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary m-1">Submit</button>
                            <button className="btn btn-secondary m-1 " type="button" data-dismiss="modal">Cancel</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Wallet;

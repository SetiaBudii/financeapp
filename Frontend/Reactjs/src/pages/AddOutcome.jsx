import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import axios from "axios";
import Swal from "sweetalert2";

const AddOutcome = () => {
    const [allOutcome, setAllOutcome] = useState([]);
    const [newOutcome, setNewOutcome] = useState({
        id_wallet: 0,
        amount: 0,
        time_stamp: "",
        id_kategori: 0,
    });

    useEffect(() => {
        loadOutcome();
    }, []);

    const loadOutcome = async () => {
        try {
            const result = await axios.get("http://localhost:5000/outcome", { validateStatus: false });
            setAllOutcome(result.data.data);
            console.log(result.data.data);
        } catch (error) {
            console.error("Error loading outcome data:", error);
        }
    }

    const AddNewOutcome = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Send a POST request to add the new income data
            newOutcome.amount = parseInt(newOutcome.amount);
            newOutcome.id_wallet = parseInt(newOutcome.id_wallet);
            newOutcome.time_stamp = convertDateDDMMYYToISOString(newOutcome.time_stamp);
            newOutcome.id_kategori = parseInt(newOutcome.id_kategori);
            console.log(newOutcome);
            const data = await axios.post("http://localhost:5000/outcome", newOutcome, { validateStatus: false });

            if (data.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Income Added!',
                    text: data.data.msg,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Income Failed!',
                    text: data.data.msg,
                });
            }

            // Reload the income data after adding
            loadOutcome();

            // Clear the input fields
            setNewOutcome({ id_wallet: 0, amount: 0, time_stamp: "" , id_kategori: 0});
        } catch (error) {
            console.error("Error adding outcome:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOutcome({ ...newOutcome, [name]: value });
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Outcome</h1>
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                            </a>
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4 mt-5">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary text-center">OUTCOME</h6>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#addoutcomemodal">Add Outcome</button>
                                    <div className="table-responsive">
                                        <table className="table table-bordered text-center" id="dataTable">
                                            <thead>
                                                <tr>
                                                    <th>Id Wallet</th>
                                                    <th>Id Income</th>
                                                    <th>Amount</th>
                                                    <th>Time Stamp</th>
                                                    <th>Id Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allOutcome && allOutcome.map((outcome) => (
                                                    <tr key={outcome.id_outcome}>
                                                        <td>{outcome.id_wallet}</td>
                                                        <td>{outcome.id_outcome}</td>
                                                        <td>{outcome.amount}</td>
                                                        <td>{outcome.time_stamp}</td>
                                                        <td>{outcome.id_kategori}</td>
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
            {/* add income Modal*/}
            <div className="modal fade" id="addoutcomemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
            </div>
        </div>
    );
}

export default AddOutcome;

import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import ShowTipe from "../component/ShowTipe";
import IdWallett from "../component/IdWallet";
import IncomeTable from "../component/IncomeTable";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Income = () => {
    const [allIncome, setAllIncome] = useState([]);
    const [tipeWallet, setTipeWallet] = useState([]);
    const [newIncome, setNewIncome] = useState({
        id_wallet: 0,
        amount: 0,
        time_stamp: "",
    });

    useEffect(() => {
        loadIncome();
    }, []);

    const handleDataFromChild = (data) => {
        setTipeWallet(data);
    };

    const loadIncome = async () => {
        try {
            const result = await axios.get("http://localhost:5000/income", { validateStatus: false });
            setAllIncome(result.data.data);
        } catch (error) {
            console.error("Error loading income data:", error);
        }
    }

    const addIncome = async (e) => {
        e.preventDefault();

        try {
            const id = await axios.post("http://localhost:5000/wallet/getid", {
                username: Cookies.get("username"),
                tipe_wallet: tipeWallet,
            }, { validateStatus: false });

            newIncome.amount = parseInt(newIncome.amount);
            newIncome.id_wallet = parseInt(id.data.data[0].id_wallet);
            const date = new Date(newIncome.time_stamp);
            newIncome.time_stamp = date.toISOString();
            const data = await axios.post("http://localhost:5000/income", newIncome, { validateStatus: false });

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
            loadIncome();

            // Clear the input fields
            setNewIncome({ id_wallet: 0, amount: 0, time_stamp: "" });
        } catch (error) {
            console.error("Error adding income:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIncome({ ...newIncome, [name]: value });
    };

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <div className="container-fluid">
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Income</h1>
                            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                <i className="fas fa-download fa-sm text-white-50"></i> Generate Report
                            </a>
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4 mt-5">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary text-center">INCOME</h6>
                                </div>
                                <div className="card-body">
                                    <button type="button" className="btn btn-primary mb-4" data-toggle="modal" data-target="#addincomemodal">Add Income</button>
                                    {/* <div className="table-responsive">
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
                                                        <td>{income.amount}</td>
                                                        <td>{formatDateDDMMYYYY(income.time_stamp)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div> */}
                                    <IncomeTable allIncome={allIncome} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* add income Modal*/}
            <div className="modal fade" id="addincomemodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
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
                            <ShowTipe onTipeChange={handleDataFromChild} />
                            <form onSubmit={addIncome}>
                                <div className="form-group">
                                    <label htmlFor="amount">Amount</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="amount"
                                        name="amount"
                                        value={newIncome.amount}
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
                                        value={newIncome.time_stamp}
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

export default Income;

import React, { useEffect, useState } from "react";
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import ShowTipe from "../component/ShowTipe";
import WalletTypeDropdown from "../component/WalletDropdown";
import IncomeTable from "../component/IncomeTable";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Income = () => {
    const [allIncome, setAllIncome] = useState([]);
    const [selectedWalletId, setSelectedWalletId] = useState('');
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
            const result = await axios.get(`http://localhost:5000/income/per/${Cookies.get("username")}`, { validateStatus: false });
            setAllIncome(result.data.data);
            
        } catch (error) {
            console.error("Error loading income data:", error);
        }
    }

    const handleWalletChange = (value) => {
        setSelectedWalletId(value);
      };

    const addIncome = async (e) => {
        e.preventDefault();

        try {
            newIncome.amount = parseInt(newIncome.amount);
            newIncome.id_wallet = parseInt(selectedWalletId);
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
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4">
                                <a href="#collapseCardExample" className="d-block card-header py-3" data-toggle="collapse"
                                    role="button" aria-expanded="true" aria-controls="collapseCardExample">
                                    <h6 className="m-0 font-weight-bold text-primary">ADD INCOME</h6>
                                </a>
                                <div className="collapse show" id="collapseCardExample">
                                    <div className="card-body">
                                        {/* <ShowTipe onTipeChange={handleDataFromChild} /> */}
                                        <WalletTypeDropdown onWalletChange={handleWalletChange}/>
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
                                                    style={{ width: "50%" }}
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
                                                    style={{ width: "50%" }}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary m-1">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="card shadow mb-4 mt-5">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary text-center">LIST INCOME</h6>
                                </div>
                                <div className="card-body">
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

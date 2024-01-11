import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import ShowTipe from "../component/ShowTipe";
import WalletTypeDropdown from "../component/WalletDropdown";
import IncomeTable from "../component/IncomeTable";
import IncomeReactTable from "../component/IncomeReactTable";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Income = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [newIncome, setNewIncome] = useState({
    id_wallet: 0,
    amount: "",
    time_stamp: "",
  });

  const [deletesIncome, setDeletesIncome] = useState({
    id_income: 0,
  });

  useEffect(() => {
    loadIncome();
  }, []);

  const handleDataFromChild = (data) => {
    setTipeWallet(data);
  };

  const loadIncome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/income/per/${Cookies.get("username")}`,
        { validateStatus: false }
      );
      setAllIncome(result.data.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  };

  const handleWalletChange = (value) => {
    setSelectedWalletId(value);
  };

  const deleteIncome = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.delete(
        `http://localhost:5000/income/${deletesIncome.id_income}`,
        { validateStatus: false }
      );
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Income Deleted!",
          text: data.data.msg,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Income Failed!",
          text: data.data.msg,
        });
      }
      $("#deleteincomemodal").modal("hide");
      loadIncome();
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const addIncome = async (e) => {
    e.preventDefault();

    try {
      if (newIncome.time_stamp === "") {
        Swal.fire({
          icon: "error",
          title: "Income Failed!",
          text: "Please fill the time stamp",
        });
        return;
      }

      newIncome.amount = parseInt(newIncome.amount);
      newIncome.id_wallet = parseInt(selectedWalletId);
      const date = new Date(newIncome.time_stamp);
      newIncome.time_stamp = date.toISOString();
      const data = await axios.post("http://localhost:5000/income", newIncome, {
        validateStatus: false,
      });

      if (data.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Income Added!",
          text: data.data.msg,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Income Failed!",
          text: data.data.msg,
        });
      }
      $("#addincomemodal").modal("hide");

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

  const handleDeleteOnClick = (id) => {
    setDeletesIncome({ id_income: id });
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h6 mb-0 text-gray-800">Cashflow / Income</h1>
            </div>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  LIST INCOME
                </h6>
              </div>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary mb-4"
                  data-toggle="modal"
                  data-target="#addincomemodal"
                >
                  Add Income
                </button>
                {/* <IncomeTable allIncome={allIncome} handleDeleteClick={handleDeleteOnClick}/> */}
                <IncomeReactTable
                  allIncome={allIncome}
                  handleDeleteClick={handleDeleteOnClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add income Modal*/}
      <div
        className="modal fade"
        id="addincomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Income
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              {/* <ShowTipe onTipeChange={handleDataFromChild} /> */}
              <label>Select Wallet</label>
              <WalletTypeDropdown onWalletChange={handleWalletChange} />
              <form onSubmit={addIncome}>
                <div className="form-group">
                  <label htmlFor="amount">Amounts</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text rounded-0">Rp.</span>
                    <input
                      type="number"
                      class="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      id="amount"
                      name="amount"
                      value={newIncome.amount}
                      onChange={handleInputChange}
                      min={1}
                      placeholder="0"
                      required
                    />
                    <span class="input-group-text rounded-0">.00</span>
                  </div>
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* delete income Modal*/}
      <div
        className="modal fade"
        id="deleteincomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete income
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={deleteIncome}>
                <input
                  type="hidden"
                  name="id_income"
                  id="id_income"
                  value={deletesIncome.id_income}
                />
                <p>Are you sure want to delete this income? </p>
                <button type="submit" className="btn btn-primary m-1">
                  Delete
                </button>
                <button
                  className="btn btn-secondary m-1 "
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;

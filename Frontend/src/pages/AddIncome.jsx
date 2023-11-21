import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const AddIncome = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [allkategori, setAllKategori] = useState([]);
  const [username, setUsername] = useState("");
  const [newIncome, setNewIncome] = useState({
    id_wallet: 0,
    amount: 0,
    time_stamp: "",
  });

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    loadIncome();
  }, []);

  const loadIncome = async () => {
    try {
      const result = await axios.get("http://localhost:5000/income", {
        validateStatus: false,
      });
      setAllIncome(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  };

  const loadKategori = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/kategori/${username}`,
        { validateStatus: false }
      );
      setAllKategori(result.data.data);
      console.log(result.data.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  };

  const formatDateToISOString = (dateString) => {
    if (!dateString) {
      return "";
    }

    const parts = dateString.split("-");
    if (parts.length !== 3) {
      return "";
    }

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    // Create a new Date object with the given year, month, and day
    const dateObject = new Date(year, month - 1, day);

    // Use the toISOString() method to get the ISO-8601 formatted string
    return dateObject.toISOString();
  };

  const addIncome = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to add the new income data
      newIncome.amount = parseInt(newIncome.amount);
      newIncome.id_wallet = parseInt(newIncome.id_wallet);
      const isoDateString = formatDateToISOString(newIncome.time_stamp);
      newIncome.time_stamp = isoDateString;
      console.log(newIncome);
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
              <a
                href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="fas fa-download fa-sm text-white-50"></i> Generate
                Report
              </a>
            </div>
            <div className="container-fluid">
              <div className="card shadow mb-4 mt-5">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary text-center">
                    INCOME
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
                  <div className="table-responsive">
                    <table
                      className="table table-bordered text-center"
                      id="dataTable"
                    >
                      <thead>
                        <tr>
                          <th>Id Wallet</th>
                          <th>Id Income</th>
                          <th>Amount</th>
                          <th>Time Stamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allIncome &&
                          allIncome.map((income) => (
                            <tr key={income.id_income}>
                              <td>{income.id_wallet}</td>
                              <td>{income.id_income}</td>
                              <td>{income.amount}</td>
                              <td>{income.time_stamp}</td>
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
      <div
        className="modal fade"
        id="addincomemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add income
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
              {" "}
              <form onSubmit={addIncome}>
                <div className="form-group">
                  <label htmlFor="id_wallet">Id Wallet</label>
                  <input
                    type="number"
                    className="form-control"
                    id="id_wallet"
                    name="id_wallet"
                    value={newIncome.id_wallet}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
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
    </div>
  );
};

export default AddIncome;

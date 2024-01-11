import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import CategoryDropdown from "../component/KategoriDropdown";
import WalletTypeDropdown from "../component/WalletDropdown";
import TableReactOutcome from "../component/OutcomeReactTable";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const AddOutcome = () => {
  const [username, setUsername] = useState("");
  const [userOutcomes, setUserOutcomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saldo, setSaldo] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState("");
  const [deletesOutcome, setDeletesOutcome] = useState({ id_outcome: 0 });

  const [newOutcome, setNewOutcome] = useState({
    id_wallet: 0,
    amount: "",
    time_stamp: "",
    id_kategori: 0,
  });

  useEffect(() => {
    // Fetch outcomes from the API
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    axios
      .get(`http://localhost:5000/outcome/per/${storedUsername}`)
      .then((response) => {
        setUserOutcomes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching outcomes:", error);
        setLoading(false);
      });
  }, []);

  const loadOutcome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/outcome/per/${username}`
      );
      setUserOutcomes(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  };

  const AddNewOutcome = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const saldoWallet = await axios.get(
        `http://localhost:5000/wallet/id/${selectedWalletId}`
      );
      if (saldoWallet.data.data.saldo < parseInt(newOutcome.amount)) {
        Swal.fire({
          icon: "error",
          title: "Outcome Failed!",
          text: "Not enough balance",
        });
        return;
      }

      if (newOutcome.time_stamp === "") {
        Swal.fire({
          icon: "error",
          title: "Outcome Failed!",
          text: "Please fill the date",
        });
        return;
      }

      // Send a POST request to add the new income data
      newOutcome.amount = parseInt(newOutcome.amount);
      newOutcome.id_wallet = parseInt(selectedWalletId);
      const isoDateString = formatDateToISOString(newOutcome.time_stamp);
      newOutcome.time_stamp = isoDateString;
      newOutcome.id_kategori = parseInt(selectedCategory);
      const data = await axios.post(
        "http://localhost:5000/outcome",
        newOutcome,
        { validateStatus: false }
      );

      if (data.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Outcome Added!",
          text: data.data.msg,
        });
        $("#addoutcomemodal").modal("hide");
      } else {
        Swal.fire({
          icon: "error",
          title: "Income Failed!",
          text: data.data.msg,
        });
      }

      // Reload the income data after adding
      loadOutcome();

      // Clear the input fields
      setNewOutcome({
        id_wallet: 0,
        amount: 0,
        time_stamp: "",
        id_kategori: 0,
      });
    } catch (error) {
      console.error("Error adding outcome:", error);
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
    const dateObject = new Date(Date.UTC(year, month - 1, day));

    // Use the toISOString() method to get the ISO-8601 formatted string
    return dateObject.toISOString();
  };

  const sortedOutcomes = userOutcomes.slice().sort((a, b) => {
    const dateA = a.time_stamp ? new Date(a.time_stamp) : null;
    const dateB = b.time_stamp ? new Date(b.time_stamp) : null;

    if (dateA && dateB) {
      return dateA - dateB;
    }

    // Handle cases where dateA or dateB is null (N/A)
    if (dateA) {
      return -1;
    }
    if (dateB) {
      return 1;
    }

    return 0;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOutcome({ ...newOutcome, [name]: value });
  };

  const handleWalletChange = (value) => {
    setSelectedWalletId(value);
  };

  const handleKategoriChange = (value) => {
    setSelectedCategory(value);
  };

  const handleDeleteOnClick = (id) => {
    setDeletesOutcome({ id_outcome: id });
  };

  const deleteOutcome = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.delete(
        `http://localhost:5000/outcome/${deletesOutcome.id_outcome}`,
        { validateStatus: false }
      );
      if (data.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Outcome Deleted!",
          text: data.data.msg,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Outcome Failed!",
          text: data.data.msg,
        });
      }
      $("#deleteoutcomemodal").modal("hide");
      loadOutcome();
    } catch (error) {
      console.error("Error deleting outcome:", error);
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h6 mb-0 text-gray-800">Cashflow / Outcomes</h1>
            </div>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  OUTCOME
                </h6>
              </div>
              <div className="card-body">
                <button
                  type="button"
                  className="btn btn-primary mb-4"
                  data-toggle="modal"
                  data-target="#addoutcomemodal"
                >
                  Add Outcome
                </button>
                <TableReactOutcome
                  allOutcome={userOutcomes}
                  handleDeleteClick={handleDeleteOnClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add outcome Modal*/}
      <div
        className="modal fade"
        id="addoutcomemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Outcomes
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
              <form onSubmit={AddNewOutcome}>
                <label>Select Category</label>
                <CategoryDropdown onKategoriChange={handleKategoriChange} />
                <label className="mt-3">Select Wallet</label>
                <WalletTypeDropdown onWalletChange={handleWalletChange} />
                <div className="form-group">
                  <label htmlFor="amount" className="mt-2">
                    Amounts
                  </label>
                  <div class="input-group mb-3">
                    <span class="input-group-text rounded-0">Rp.</span>
                    <input
                      type="number"
                      class="form-control"
                      aria-label="Amount (to the nearest dollar)"
                      id="amount"
                      name="amount"
                      value={newOutcome.amount}
                      onChange={handleInputChange}
                      placeholder="0"
                      min={1}
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
                    value={newOutcome.time_stamp}
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

      <div
        className="modal fade"
        id="deleteoutcomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete outcome
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
              <form onSubmit={deleteOutcome}>
                <input
                  type="hidden"
                  name="id_outcome"
                  id="id_outcome"
                  value={deletesOutcome.id_outcome}
                />
                <p>Are you sure want to delete this outcome? </p>
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

export default AddOutcome;

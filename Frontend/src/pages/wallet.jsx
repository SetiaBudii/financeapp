import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Wallet = () => {
  const [allWallet, setAllWallet] = useState([]);
  const [username, setUsername] = useState("");
  const [saldo, setSaldo] = useState("");

  const [newTipe, setNewTipe] = useState({
    tipe: "",
  });

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
      loadKategori(storedUsername);
    }
  }, []);

  const loadKategori = async (x) => {
    try {
      const result = await axios.get(`http://localhost:5000/wallets/${x}`, {
        validateStatus: false,
      });
      setAllWallet(result.data.data);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  };

  const AddNewTipe = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:5000/tipe_wallet",
        newTipe,
        { validateStatus: false }
      );

      if (data.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Tipe Wallet Added!",
          text: data.data.msg,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Income Failed!",
          text: data.data.msg,
        });
      }

      if (username) {
        loadKategori(username);
      }

      setNewTipe({ tipe: "" });
    } catch (error) {
      console.error("Error adding outcome:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTipe({ ...newTipe, [name]: value });
  };

  const handleSubmitDelete = async (selectedTipe) => {
    try {
      await axios.delete(
        `http://localhost:5000/wallet/${username}/${selectedTipe}`
      );

      console.log("Wallet deleted successfully");

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Wallet Deleted successfully",
      });
      // Remove the deleted wallet type from the state
      setAllWallet((prevWallets) =>
        prevWallets.filter((wallet) => wallet.tipe !== selectedTipe)
      );
      setSaldo("");
    } catch (error) {
      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);

        const errorMessage = error.response.data.error;

        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
        });
      } else if (error.request) {
        console.error("No response received. Network error.");

        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "No response received. Network error.",
        });
      } else {
        console.error("Error:", error.message);

        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error: ${error.message}`,
        });
      }
    }
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
            <div className="container-fluid">
              <div className="card shadow mb-4 mt-5">
                <div className="card-header py-3">
                  <div className="row">
                    <div className="col">
                      <h6 className="m-0 font-weight-bold text-primary text-center">
                        Wallet
                      </h6>
                    </div>
                    <div className="col"></div>
                  </div>
                </div>
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-primary mb-4"
                    data-toggle="modal"
                    data-target="#addoutcomemodal"
                  >
                    Add Tipe
                  </button>
                  <div className="table-responsive">
                    <table
                      className="table table-bordered text-center"
                      id="dataTable"
                    >
                      <thead>
                        <tr>
                          <th>Tipe</th>
                          <th>Saldo</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allWallet &&
                          allWallet.map((wallet) => (
                            <tr key={wallet.username}>
                              <td>{wallet.tipe}</td>
                              <td className="text-align-center">
                                {wallet.saldo.toLocaleString("de-DE")}
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm ml-2 "
                                  onClick={() =>
                                    handleSubmitDelete(wallet.tipe)
                                  }
                                >
                                  <i
                                    className="fas fa-trash"
                                    style={{ color: "#fff" }}
                                  ></i>
                                </button>
                              </td>
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
      <div
        className="modal fade"
        id="addoutcomemodal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Outcome
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
              <form onSubmit={AddNewTipe}>
                <div className="form-group">
                  <label htmlFor="tipe">Nama Tipe</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tipe"
                    name="tipe"
                    value={newTipe.tipe}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary m-1">
                  Submit
                </button>
                <button
                  className="btn btn-secondary m-1"
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

export default Wallet;

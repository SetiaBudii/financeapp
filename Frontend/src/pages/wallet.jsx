import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Wallet = () => {
  const [allWallet, setAllWallet] = useState([]);
  const [username, setUsername] = useState("");
  const [newTipe, setNewTipe] = useState({
    tipe: "",
  });

  // const [newKategori, setNewKategori] = useState({
  //     nama_kategori: 0,
  //     budget: 0,
  //     username: "",
  //     id_kategori: 0,
  // });

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
      console.log("Stored Username:", storedUsername);
      console.log(" Username:", username);
      loadKategori(storedUsername);
    }
  }, []);

  const loadKategori = async (x) => {
    try {
      const result = await axios.get(`http://localhost:5000/wallets/${x}`, {
        validateStatus: false,
      });
      setAllWallet(result.data.data);
      console.log(result.data.data);
      console.log(`http://localhost:5000/wallets/${x}`);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  };
  const AddNewTipe = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to add the new income data
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

      // Reload the income data after adding
      if (username) {
        loadKategori(username);
      }
      $("#addtipemodal").modal("hide");

      // Clear the input fields
      setNewTipe({ tipe: "" });
    } catch (error) {
      console.error("Error adding outcome:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Use "name" to access the input field's name attribute
    setNewTipe({ ...newTipe, [name]: value });
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
                    data-target="#addtipemodal"
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
                        </tr>
                      </thead>
                      <tbody>
                        {allWallet &&
                          allWallet.map((wallet) => (
                            <tr key={wallet.username}>
                              <td>{wallet.tipe}</td>
                              <td className="text-right">
                                {wallet.saldo.toLocaleString("de-DE")}
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
        id="addtipemodal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Tipe Wallet
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
                    type="text" // Change the type to "text" for string input
                    className="form-control"
                    id="tipe" // Make sure the ID matches the name
                    name="tipe" // Update the name to match the state variable
                    value={newTipe.tipe} // Update the value to match the state variable
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

export default Wallet;

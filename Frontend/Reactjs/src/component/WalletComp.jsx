import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const WalletForm = ({ username, selectedTipe }) => {
  const [saldo, setSaldo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert saldo to an integer
    const saldoValue = parseInt(saldo, 10);

    try {
      await axios.post("http://localhost:5000/wallet", {
        username,
        saldo: saldoValue, // Send the converted value
        tipe_wallet: selectedTipe,
      });

      // Handle success
      console.log("Wallet created successfully");

      // Show a SweetAlert success pop-up
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Wallet created successfully",
      });

      // Clear the input field after successful creation
      setSaldo("");
    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);

        // Access the error message from the response data
        const errorMessage = error.response.data.error;

        // Show a SweetAlert error pop-up with the error message
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
        });
      } else if (error.request) {
        // The request was made, but no response was received
        console.error("No response received. Network error.");

        // Show a SweetAlert error pop-up
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "No response received. Network error.",
        });
      } else {
        // Something else happened
        console.error("Error:", error.message);

        // Show a SweetAlert error pop-up
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: `Error: ${error.message}`,
        });
      }
    }
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "500px",
        height: "300px",
        margin: "0 auto",
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="card-body" style={{ textAlign: "center", width: "80%" }}>
        <h2>Create Wallet</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="saldo"
              className="form-label"
              style={{ marginTop: "45px", fontSize: "18px" }}
            >
              Saldo:
            </label>
            <input
              type="number"
              className="form-control"
              id="saldo"
              name="saldo"
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              required
              style={{ textAlign: "center" }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Wallet
          </button>
        </form>
      </div>
    </div>
  );
};

export default WalletForm;

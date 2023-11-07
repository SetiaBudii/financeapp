import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowTipe({ onTipeChange }) {
  const [tipeWallets, setTipeWallets] = useState([]);
  const [selectedTipe, setSelectedTipe] = useState("");

  useEffect(() => {
    // Fetch 'tipe_wallet' items when the component mounts
    loadTipe();
  }, []);

  const loadTipe = async () => {
    const result = await axios.get("http://localhost:5000/tipe_wallet");
    setTipeWallets(result.data);
  };

  const handleTipeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTipe(selectedValue);
    // Call the callback function to send the selected value to the parent
    onTipeChange(selectedValue);
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "300px",
        marginLeft: "20px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="card-body">
        <label className="mr-2 mb-3">Pilih tipe Wallet : </label>
        <select
          onChange={handleTipeChange}
          value={selectedTipe}
          className="form-select"
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%",
          }}
        >
          <option value="">- -</option> {/* Blank default option */}
          {tipeWallets.map((tipeWallet) => (
            <option key={tipeWallet.tipe} value={tipeWallet.tipe}>
              {tipeWallet.tipe}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ShowTipe;

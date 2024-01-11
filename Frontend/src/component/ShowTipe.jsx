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
    setTipeWallets(result.data.data);
  };

  const handleTipeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTipe(selectedValue);
    // Call the callback function to send the selected value to the parent
    onTipeChange(selectedValue);
  };

  return (
    <div>
      <label htmlFor="saldo" className="form-label mx-2 ">
        Pilih Tipe Wallet :
      </label>
      <div className="row pl-3">
        <select
          onChange={handleTipeChange}
          value={selectedTipe}
          className="btn border dropdown-toggle w-100"
          data-toggle="dropdown"
          data-display="static"
          aria-haspopup="true"
          aria-expanded="false"
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

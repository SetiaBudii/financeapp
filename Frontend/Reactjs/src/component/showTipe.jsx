import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddIncome from '../pages/AddIncome';

function ShowTipe({ onTipeChange }) {
  const [tipeWallets, setTipeWallets] = useState([]);
  const [selectedTipe, setSelectedTipe] = useState('');

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
    <div className=' ml-3'style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <label>Pilih tipe Wallet :</label>
      <select onChange={handleTipeChange} value={selectedTipe}>
        <option value="">- -</option> {/* Blank default option */}
        {tipeWallets.map((tipeWallet) => (
          <option key={tipeWallet.tipe} value={tipeWallet.tipe}>
            {tipeWallet.tipe}
          </option>
        ))}
      </select>
      <AddIncome tipe={selectedTipe} />
    </div>
  );
}

export default ShowTipe;

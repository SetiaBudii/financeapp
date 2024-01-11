import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function WalletTypeDropdown({ onWalletChange }) {
  const [username, setUsername] = useState('');
  const [selectedWalletId, setSelectedWalletId] = useState('');
  const [walletTypes, setWalletTypes] = useState([]);

  useEffect(() => {
    const storedUsername = Cookies.get('username')
        if (storedUsername) {
            setUsername(storedUsername)
        }
    // Fetch the list of wallet types for the given username from your Express API
    axios.get(`http://localhost:5000/wallet/${storedUsername}`) // Adjust the URL to match your API endpoint
      .then((response) => {
        setWalletTypes(response.data);
        setSelectedWalletId(response.data[0].id_wallet);
        onWalletChange(response.data[0].id_wallet);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleWalletChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedWalletId(selectedValue);
    // Call the callback function to send the selected value to the parent
    onWalletChange(selectedValue);
  };

  return (
    <div>
      <select
        id="walletTypeDropdown"
        className="form-control"
        value={selectedWalletId}
        onChange={handleWalletChange}
      >
        {walletTypes.map((wallet) => (
          <option key={wallet.id_wallet} value={wallet.id_wallet}>
            {wallet.tipe}
          </option>
        ))}
      </select>
    </div>
  );
}

export default WalletTypeDropdown;

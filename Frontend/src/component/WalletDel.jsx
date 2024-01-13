import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const WalletDel = ({ username, selectedTipe }) => {
  const [saldo, setSaldo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(`http://localhost:5005/wallet/${username}/${selectedTipe}`);
      // Show a SweetAlert success pop-up
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Wallet Deleted successfully',
      });

      // Clear the input field after successful creation
      setSaldo('');

    } catch (error) {
      // Handle error
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);

        // Access the error message from the response data
        const errorMessage = error.response.data.error;

        // Show a SweetAlert error pop-up with the error message
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: errorMessage,
        });
      } else if (error.request) {
        // The request was made, but no response was received
        console.error('No response received. Network error.');

        // Show a SweetAlert error pop-up
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'No response received. Network error.',
        });
      } else {
        // Something else happened
        console.error('Error:', error.message);

        // Show a SweetAlert error pop-up
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: `Error: ${error.message}`,
        });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <h2>Delete Wallet</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit" className='ml-4'>Delete Wallet</button>
      </form>
    </div>
  );
};

export default WalletDel;

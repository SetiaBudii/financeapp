import React, { useEffect, useState } from 'react';
import Sidebar from '../component/Sidebar';
import Navbar from '../component/Navbar';
import Welcome from '../component/Welcome';
import ShowTipe from '../component/ShowTipe';
import WalletForm from '../component/WalletComp';

import Cookies from 'js-cookie';
import WalletDel from '../component/WalletDel';

const DelWal = () => {
  const [selectedTipe, setSelectedTipe] = useState('');
  const [username, setUsername] = useState('');

  const handleTipeChange = (value) => {
    setSelectedTipe(value);
  };

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    console.log('username :', storedUsername);

  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <ShowTipe onTipeChange={handleTipeChange} />
          <div className='mt-5'>
          <WalletDel username={username} selectedTipe={selectedTipe} />
          </div>
        </div>
        <Welcome selectedTipe={selectedTipe} />
      </div>
    </div>
  );
};

export default DelWal;

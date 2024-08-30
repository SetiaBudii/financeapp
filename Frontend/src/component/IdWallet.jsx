import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import config from './config';

const IdWallet  = ({ id }) => {
    const [tipe_wallet, setTipeWallet] = useState("");
    const username = Cookies.get("username");

    useEffect(() => {
        loadTipeWallet();
    }, []);

    const loadTipeWallet = async () => {
        const result = await axios.get(`http://${apiUrl}/wallet/${username}/${id}`);
        setTipeWallet(result.data.data.tipe);
    }

    return (
        <>
            {tipe_wallet}
        </>
    );
}

export default IdWallet;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";

const IdWallet  = ({ id }) => {
    const [tipe_wallet, setTipeWallet] = useState("");
    const username = Cookies.get("username");

    useEffect(() => {
        loadTipeWallet();
    }, []);

    const loadTipeWallet = async () => {
        const result = await axios.get(`http://${process.env.REACT_APP_API_URL}/wallet/${username}/${id}`);
        setTipeWallet(result.data.data.tipe);
    }

    return (
        <>
            {tipe_wallet}
        </>
    );
}

export default IdWallet;

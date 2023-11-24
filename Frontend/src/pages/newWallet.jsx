import React, { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Welcome from "../component/Welcome";
import ShowTipe from "../component/ShowTipe";
import WalletForm from "../component/WalletComp";
import Cookies from "js-cookie";

const NewWallet = () => {
  const [selectedTipe, setSelectedTipe] = useState("");
  const [username, setUsername] = useState("");

  const handleTipeChange = (value) => {
    setSelectedTipe(value);
  };

  useEffect(() => {
    const storedUsername = Cookies.get("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    console.log("username :", storedUsername);
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div>
            <h2
              className="h3 mb-0 text-gray-800"
              style={{
                marginLeft: "20px",
                paddingBottom: "20px",
              }}
            >
              Create Wallet
            </h2>

            <div className="card shadow mb-4 mx-4">
              <a
                href="#collapseCardExample"
                className="d-block card-header py-3"
                role="button"
                aria-expanded="true"
                aria-controls="collapseCardExample"
              >
                <h6 className="m-0 font-weight-bold text-primary text-center">
                  Create Wallet
                </h6>
              </a>
              <div className="collapse show" id="collapseCardExample">
                <div className="card-body ">
                  <div className="row ">
                    <div className="col-lg-6 col-xs-12">
                      <ShowTipe onTipeChange={handleTipeChange} />
                    </div>
                    <div className="col-lg-6 col-xs-12">
                      <WalletForm
                        username={username}
                        selectedTipe={selectedTipe}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWallet;

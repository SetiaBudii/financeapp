import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import WalletTypeDropdown from "./WalletDropdown";
import KategoriDropdown from "./KategoriDropdown";
import Cookies from "js-cookie";
import axios, { all } from "axios";

const CardInfo = () => {
  const [selectedKategoriId, setSelectedKategoriId] = useState("");
  const [selectedWalletId, setSelectedWalletId] = useState(0);
  const [allIncome, setAllIncome] = useState([]);
  const [allOutcome, setAllOutcome] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [Budget, setBudget] = useState(0);
  const [Actually, setActually] = useState(0);
  const username = Cookies.get("username");
  const date = new Date();
  const dateNow =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startSTR =
    start.getFullYear() +
    "-" +
    String(start.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(start.getDate()).padStart(2, "0");
  const endSTR =
    end.getFullYear() +
    "-" +
    String(end.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(end.getDate()).padStart(2, "0");

  const handleKategoriChange = (value) => {
    setSelectedKategoriId(value);
  };

  useEffect(() => {
    loadIncome();
    loadOutcome();
    loadWallet();
    loadKategori();
    loadKategoriActually();
  }, [selectedWalletId, selectedKategoriId]);

  const loadKategori = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/kategori/id/${selectedKategoriId}`,
        {},
        { validateStatus: false }
      );
      if (result.data.data.budget == null) {
        setBudget(0);
      } else {
        setBudget(result.data.data.budget);
      }
    } catch (error) {
      setBudget(0);
    }
  };

  const loadKategoriActually = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/outcome/sum/${selectedKategoriId}`,
        {},
        { validateStatus: false }
      );
      if (result.data.totalOutcome == null) {
        setActually(0);
      } else {
        setActually(result.data.totalOutcome);
      }
    } catch (error) {
      setActually(0);
    }
  };

  const loadWallet = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/wallet/id/${selectedWalletId}`,
        {},
        { validateStatus: false }
      );
      if (result.data.data.saldo == null) {
        setSaldo(0);
      } else {
        setSaldo(result.data.data.saldo);
      }
    } catch (error) {
      setSaldo(0);
    }
  };

  const loadIncome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/income/periode`,
        {
          params: {
            username: username,
            startDate: startSTR,
            endDate: endSTR,
          },
        },
        { validateStatus: false }
      );
      setAllIncome(result.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  };

  const loadOutcome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/outcome/periode`,
        {
          params: {
            username: username,
            startDate: startSTR,
            endDate: endSTR,
          },
        },
        { validateStatus: false }
      );
      setAllOutcome(result.data);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  };

  const handleWalletChange = (value) => {
    setSelectedWalletId(value);
    console.log("selected wallet id: ", selectedWalletId);
  };

  const TotalIncome = allIncome.reduce(
    (total, datarecap) => total + datarecap.amount,
    0
  );
  const TotalOutcome = allOutcome.reduce(
    (total, datarecap) => total + datarecap.amount,
    0
  );

  return (
    <>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        </div>
        <div className="row h-100">
          <div className="col-lg-6 col-md-6 mb-4 h-auto">
            <div className="card shadow mb-4 h-100">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between ">
                <h6 className="m-0 font-weight-bold text-primary">
                  Saldo Wallet
                </h6>
                <div className="dropdown no-arrow">
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  ></div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <WalletTypeDropdown onWalletChange={handleWalletChange} />
                  </div>
                </div>
                <div className="card py-2 mt-3">
                  <div className="card-body mb-1">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(saldo)}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-wallet fa-2x text-gray-700"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 mb-4 h-auto  ">
            <div className="card shadow mb-4 h-100">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Monthly recap
                </h6>
                <div className="dropdown no-arrow">
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  ></div>
                </div>
              </div>
              <div className="card-body">
                <div className="card">
                  <div className="card-body">
                    <h5 className="font-weight-bold text-success">
                      Income{" "}
                      <i className="far fa-plus-square fa text-success"></i>
                    </h5>

                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(TotalIncome)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="sidebar-divider"></hr>
                  <div className="card-body">
                    <h5 className="font-weight-bold text-danger">
                      Outcome{" "}
                      <i className="fas far fa-minus-square fa text-danger"></i>
                    </h5>
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(TotalOutcome)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 mb-4">
            <div className="card shadow mb-4 h-100">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Budget Condition
                </h6>
                <div className="dropdown no-arrow">
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  ></div>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <KategoriDropdown onKategoriChange={handleKategoriChange} />
                  </div>
                </div>
                <div className="card py-2 mt-3 border-0 ">
                  <div className="card-body mb-1">
                    <div className="row no-gutters align-items-center text-center">
                      <div className="col border-right border-danger ">
                        <div
                          className={`h6 mb-0 font-weight-bold ${
                            Actually > Budget ? "text-danger" : "text-success"
                          }`}
                        >
                          {formatterIDR.format(Actually)}
                        </div>
                      </div>
                      <div className="col">
                        <div className="h6 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(Budget)}
                        </div>
                      </div>
                    </div>
                    <div className="row no-gutters align-items-center text-center mt-2">
                      <div className="col-6 border-right border-dark">
                        <div className="h7 mb-0 font-weight-bold text-gray-800">
                          Actually
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="h7 mb-0 font-weight-bold text-gray-800">
                          Budget
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center text-center mt-3">
                      <div className="col-5  mt-3 align-items-center">
                        <p
                          className={` mt-0 mb-0 ${
                            Actually > Budget ? "budget-danger" : "budget-safe"
                          }`}
                        >
                          {Actually > Budget
                            ? `Your Budget is over ${formatterIDR.format(
                                -1 * (Budget - Actually)
                              )}`
                            : ` Your are saving ${formatterIDR.format(
                                Budget - Actually
                              )}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardInfo;

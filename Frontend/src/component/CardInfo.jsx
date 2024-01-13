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
  const [totalSaldo, setTotalSaldo] = useState(0);
  const [Budget, setBudget] = useState(0);
  const [Actually, setActually] = useState(0);
  const username = Cookies.get("username");
  const date = new Date();
  const dateNow = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
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
    loadTotalSaldoWallet();
  }, [selectedWalletId, selectedKategoriId,saldo]);

  const loadKategori = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/kategori/id/${selectedKategoriId}`,
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
        `http://localhost:5005/outcome/sum/${selectedKategoriId}`,
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
        `http://localhost:5005/wallet/id/${selectedWalletId}`,
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

  const loadTotalSaldoWallet = async () => {
    try {
      const username = Cookies.get("username");
      const result = await axios.get(
        `http://localhost:5005/wallet/${username}`,
        {
          validateStatus: false,
        }
      );

      if (result.data && result.data.length > 0) {
        // Mengambil nilai setiap saldo dan menjumlahkannya
        const total = result.data.reduce((accumulator, wallet) => {
          return accumulator + wallet.saldo;
        }, 0);

        // Menetapkan total saldo ke state
        setTotalSaldo(total);
      } else {
        setTotalSaldo(0);
      }
    } catch (error) {
      setTotalSaldo(0);
      console.error("Error loading wallet data:", error);
    }
  };

  const loadIncome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/income/periode`,
        {
          params: {
            username: username,
            startDate: startSTR,
            endDate: endSTR,
          },
        },
        { validateStatus: false }
      );
      setAllIncome(result.data.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  };

  const loadOutcome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5005/outcome/periode`,
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
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
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
                  <div className="col-xs-12 col-sm-6 ">
                    <WalletTypeDropdown onWalletChange={handleWalletChange} />
                  </div>
                </div>
                <div className="card py-2 mt-3">
                  <div className="card-body mb-1">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <h5 className="font-weight-bold text-primary">Saldo</h5>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(saldo)}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-money-bill fa-2x text-success"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-1">
                  <div className="card-body">
                    <h5 className="font-weight-bold text-primary">
                      Total Saldo Wallet
                    </h5>
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(totalSaldo)}
                        </div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-wallet fa-2x text-primary"></i>
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
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="font-weight-bold text-success mb-0">
                        Income
                      </h5>
                      <i className="fas far fa-plus-square fa-2x text-success"></i>
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h4 mb-0 font-weight-bold text-gray-800">
                          {formatterIDR.format(TotalIncome)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="sidebar-divider"></hr>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="font-weight-bold text-danger mb-0">
                        Outcome
                      </h5>
                      <i className="fas far fa-minus-square fa-2x text-danger"></i>
                    </div>
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="h4 mb-0 font-weight-bold text-gray-800">
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
                  <div className="col-sm-4 col-xs-12">
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
                      <div className="col-12 col-sm-6 col-xs-12 mt-3 align-items-center">
                        <p
                          className={` mt-0 mb-0 h7 ${
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

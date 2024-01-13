import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Table from "../component/ReportTable";
import axios from "axios";

const Report = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [allOutcome, setAllOutcome] = useState([]);
  const username = Cookies.get("username");
  const currentDate = new Date();
  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startSTR = start.getFullYear() + '-' + (String(start.getMonth() + 1).padStart(2, '0')) + '-' + String(start.getDate()).padStart(2, '0');
  const endSTR = end.getFullYear() + '-' + (String(end.getMonth() + 1).padStart(2, '0')) + '-' + String(end.getDate()).padStart(2, '0');

  useEffect(() => {
    loadIncome();
    loadOutcome();
  }, []);

  const loadIncome = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/income/totalincomeperiode`, {
        params: {
          username: Cookies.get("username"),
          startDate: startSTR,
          endDate: endSTR,
        }
      }, { validateStatus: false });
      setAllIncome(result.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  }

  const loadOutcome = async () => {
    try {
      const result = await axios.get(`http://localhost:5005/outcome/total`, {
        params: {
          username: Cookies.get("username"),
          startDate: startSTR,
          endDate: endSTR,
        }
      }, { validateStatus: false });
      setAllOutcome(result.data);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  }

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <a href="#collapseIncomeCard" className="d-block card-header py-3" data-toggle="collapse"
                  role="button" aria-expanded="true" aria-controls="collapseIncomeCard">
                  <h6 className="m-0 font-weight-bold text-primary text-center">Montly Income's</h6>
                </a>
                <div className="collapse show" id="collapseIncomeCard">
                  <div className="card-body">
                    <Table data={allIncome} />
                  </div>
                </div>
              </div>
              <div className="card shadow mb-4">
                <a href="#collapseOutcomeCard" className="d-block card-header py-3" data-toggle="collapse"
                  role="button" aria-expanded="true" aria-controls="collapseOutcomeCard">
                  <h6 className="m-0 font-weight-bold text-primary text-center">Montly Outcome's</h6>
                </a>
                <div className="collapse show" id="collapseOutcomeCard">
                  <div className="card-body">
                    <Table data={allOutcome} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Report;

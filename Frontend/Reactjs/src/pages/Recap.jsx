import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Table from "../component/RecapTable";
import axios from "axios";

const Recap = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [allOutcome, setAllOutcome] = useState([]);
  const username = Cookies.get("username");
  const date = new Date();

  useEffect(() => {
    loadIncome();
    loadOutcome();
  }, []);

  const loadIncome = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/income/periode`, {
        params: {
          username: username,
          startDate: date,
          endDate: date,
        }
      }, { validateStatus: false });
      setAllIncome(result.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  }

  const loadOutcome = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/outcome/periode`, {
        params: {
          username: username,
          startDate: date,
          endDate: date,
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
                  <h6 className="m-0 font-weight-bold text-primary text-center">Today's Income</h6>
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
                  <h6 className="m-0 font-weight-bold text-primary text-center">Today's Outcome</h6>
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

export default Recap;

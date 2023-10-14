import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Table from "../component/RecapTable";
import axios from "axios";

const Recap = () => {

  const [allIncome, setAllIncome] = useState([]);
  const username = Cookies.get("username");
  const date = new Date();
  const endDate = new Date("2023-10-15");

  useEffect(() => {
    loadIncome();
  }, []);

  const loadIncome = async () => {

    try {
      const result = await axios.get(`http://localhost:5000/income/periode`, {
        params: {
          username: username,
          startDate: date,
          endDate: endDate
        }
      }, { validateStatus: false });
      setAllIncome(result.data);
    } catch (error) {
      console.error("Error loading income data:", error);
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
                <a href="#collapseCardExample" className="d-block card-header py-3" data-toggle="collapse"
                  role="button" aria-expanded="true" aria-controls="collapseCardExample">
                  <h6 className="m-0 font-weight-bold text-primary text-center">Today's Income</h6>
                </a>
                <div className="collapse show" id="collapseCardExample">
                  <div className="card-body">
                    <Table data={allIncome} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default Recap;
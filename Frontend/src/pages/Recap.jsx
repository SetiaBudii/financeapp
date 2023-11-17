import React, { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import Table from "../component/ReportTable";
import axios from "axios";

const Recap = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [allOutcome, setAllOutcome] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    loadIncome();
    loadOutcome();
  }, [startDate, endDate]);

  const loadIncome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/income/totalincomeperiode`,
        {
          params: {
            username: Cookies.get("username"),
            startDate: startDate,
            endDate: endDate,
          },
        },
        { validateStatus: false }
      );
      console.log(result.data);
      setAllIncome(result.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  };

  const loadOutcome = async () => {
    try {
      const result = await axios.get(
        `http://localhost:5000/outcome/total`,
        {
          params: {
            username: Cookies.get("username"),
            startDate: startDate,
            endDate: endDate,
          },
        },
        { validateStatus: false }
      );
      setAllOutcome(result.data);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  };

  const handleDate = (e) => {
    e.preventDefault(); // Prevent the default form submission.
    const selectedStartDate = e.target.dateStart.value;
    const selectedEndDate = e.target.dateEnd.value;
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  };

  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <div className="card shadow mb-4">
                    <a
                      href="#collapseIncomeCards"
                      className="d-block card-header py-3"
                      data-toggle="collapse"
                      role="button"
                      aria-expanded="true"
                      aria-controls="collapseIncomeCards"
                    >
                      <h6 className="m-0 font-weight-bold text-primary text-center">
                        Select Date
                      </h6>
                    </a>
                    <div className="collapse show" id="collapseIncomeCards">
                      <div className="card-body">
                        <form onSubmit={handleDate} className="m-3">
                          <div className="text-center mb-3">
                            <label
                              htmlFor="dateStart"
                              style={{ marginRight: "65px" }}
                            >
                              Start Date:{" "}
                            </label>
                            <input
                              type="date"
                              name="dateStart"
                              id="dateStart"
                              className="mx-2 "
                              style={{
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                marginRight: "10px",
                                backgroundColor: "#f2f2f2",
                              }}
                              required
                            />
                            <label
                              htmlFor="dateEnd"
                              style={{ marginRight: "70px", marginTop: "20px" }}
                            >
                              End Date:{" "}
                            </label>
                            <input
                              type="date"
                              name="dateEnd"
                              id="dateEnd"
                              className="mx-2"
                              style={{
                                padding: "8px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                marginRight: "10px",
                                backgroundColor: "#f2f2f2",
                              }}
                              required
                            />
                          </div>
                          <div className="text-center">
                            <button type="submit" className="btn btn-primary">
                              Generate
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card shadow mb-4">
                <a
                  href="#collapseIncomeCard"
                  className="d-block card-header py-3"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="true"
                  aria-controls="collapseIncomeCard"
                >
                  <h6 className="m-0 font-weight-bold text-primary text-center">
                    Recap Income
                  </h6>
                </a>
                <div className="collapse show" id="collapseIncomeCard">
                  <div className="card-body">
                    <Table data={allIncome} />
                  </div>
                </div>
              </div>
              <div className="card shadow mb-4">
                <a
                  href="#collapseOutcomeCard"
                  className="d-block card-header py-3"
                  data-toggle="collapse"
                  role="button"
                  aria-expanded="true"
                  aria-controls="collapseOutcomeCard"
                >
                  <h6 className="m-0 font-weight-bold text-primary text-center">
                    Recap Outcome
                  </h6>
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
  );
};

export default Recap;

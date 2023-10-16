import React from 'react'
import { useState, useEffect } from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import Welcome from '../component/Welcome'
import CardInfo from '../component/CardInfo'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios, { all } from 'axios'
import Cookies from 'js-cookie'


const Home = () => {
  const [allIncome, setAllIncome] = useState([]);
  const [allOutcome, setAllOutcome] = useState([]);
  const currentDate = new Date();
  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  useEffect(() => {
      loadIncome();
      loadOutcome();
  }, []);

  const loadIncome = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/income/totalincomeperiode`, {
        params: {
          username: Cookies.get("username"),
          startDate: start,
          endDate: end,
        }
      }, { validateStatus: false });
      setAllIncome(result.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  }

  const loadOutcome = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/outcome/total`, {
        params: {
          username: Cookies.get("username"),
          startDate: start,
          endDate: end,
        }
      }, { validateStatus: false });
      setAllOutcome(result.data);
      console.log(result.data)
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  }

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: allIncome.map((income, index) => index + 1), // Extract the date from your allIncome data
      title: {
        text: 'Day of the Month',
      },
    },
    yAxis: {
      title: {
        text: 'Amount (in Rupiah)',
      },
    },
    series: [
      {
        name: 'Income',
        data: allIncome.map((income) => income.amount), // Extract the amount from your allIncome data
      },
      {
        name: 'Outcome',
        data: allOutcome.map((outcome) => outcome.amount), // Extract the amount from your allOutcome data
      },
    ],
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Navbar />
          <CardInfo />
          <div className="container-fluid">
            <div class="card shadow mb-4">
              <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse"
                role="button" aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary text-center">INCOME VS OUTCOME REPORT</h6>
              </a>
              <div class="collapse show" id="collapseCardExample">
                <div class="card-body">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Welcome />
      </div>
    </div>
  )
}

export default Home
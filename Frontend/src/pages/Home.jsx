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
  const [sumKategori, sumAllKategori] = useState([]);
  const username = Cookies.get("username");
  const currentDate = new Date();
  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  let startSTR = start.getFullYear() + '-' + (String(start.getMonth() + 1).padStart(2, '0')) + '-' + String(start.getDate()).padStart(2, '0');
  let endSTR = end.getFullYear() + '-' + (String(end.getMonth() + 1).padStart(2, '0')) + '-' + String(end.getDate()).padStart(2, '0');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Initial values for month and year
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Define a list of months and years


  console.log(months[selectedMonth])
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 10; year--) {
    years.push(year);
  }
  // Event handler for month dropdown
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  }

  // Event handler for year dropdown
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  }

  useEffect(() => {
    const startDate = new Date(selectedYear, months.indexOf(selectedMonth));
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    startSTR = startDate.getFullYear() + '-' + (String(startDate.getMonth() + 1).padStart(2, '0')) + '-' + String(startDate.getDate()).padStart(2, '0');
    endSTR = endDate.getFullYear() + '-' + (String(endDate.getMonth() + 1).padStart(2, '0')) + '-' + String(endDate.getDate()).padStart(2, '0');
    console.log(startSTR)
    console.log(endSTR)
    loadIncome();
    loadOutcome();
    sumAll();
  }, [selectedMonth, selectedYear]);

  const loadIncome = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/income/totalincomeperiode`, {
        params: {
          username: Cookies.get("username"),
          startDate: startSTR,
          endDate: endSTR,
        }
      }, { validateStatus: false });
      setAllIncome(result.data.data);
    } catch (error) {
      console.error("Error loading income data:", error);
    }
  }

  const loadOutcome = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/outcome/total`, {
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

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: allIncome.map((income, index) => index + 1),
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
        data: allIncome.map((income) => income.amount),
      },
      {
        name: 'Outcome',
        data: allOutcome.map((outcome) => outcome.amount),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 700, // Adjust the maximum width as needed
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
            xAxis: {
              title: {
                enabled: false, // Disable x-axis title on small screens
              },
            },
            yAxis: {
              title: {
                enabled: false, // Disable y-axis title on small screens
              },
            },
          },
        },
      ],
    },
  };


  const sumAll = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/outcome/sumall/${username}`, {
      }, { validateStatus: false });
      sumAllKategori(result.data);
      console.log(result.data);
      console.log(username);
    } catch (error) {
      console.error("Error loading outcome data:", error);
    }
  }

  const pieChart = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: '',
      align: 'left',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>Rp.{point.y}</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
      },
    },
    series: [
      {
        name: 'Category',
        colorByPoint: true,
        data: sumKategori.map((outcome) => ({
          name: outcome.nama_kategori,
          y: outcome.amount,
        })),
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 700, // Adjust the maximum width as needed
          },
          chartOptions: {
            plotOptions: {
              pie: {
                dataLabels: {
                  enabled: false,
                },
                showInLegend: true,
              },
            },
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
          },
        },
      ],
    },
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
                  <form action="" className='mb-4'>
                    <div className="row ml-4">
                      <div className="col-12">
                        <div>
                          <form>
                            <div className="row align-items-center">
                              <div className="col-lg-3">
                                <label htmlFor="month" className='text-gray-900 mt-2'>Month:</label>
                                <select id="month" value={selectedMonth} onChange={handleMonthChange} className='ml-2'>
                                  {months.map((month, index) => (
                                    <option
                                      key={index}
                                      value={month}
                                    >{month}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-lg-3">
                                <label htmlFor="year" className='text-gray-900 mt-2 mr-3'>Year:</label>
                                <select id="year" value={selectedYear} onChange={handleYearChange} className='ml-2'>
                                  {years.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </form>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                  />
                </div>
              </div>
            </div>
            <div class="card shadow mb-4">
              <a href="#collapseCardExample" class="d-block card-header py-3" data-toggle="collapse"
                role="button" aria-expanded="true" aria-controls="collapseCardExample">
                <h6 class="m-0 font-weight-bold text-primary text-center">OUTCOMES BASED ON CATEGORY</h6>
              </a>
              <div class="collapse show" id="collapseCardExample">
                <div class="card-body">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={pieChart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
import React from 'react'
import Sidebar from '../component/Sidebar'
import Navbar from '../component/Navbar'
import Welcome from '../component/Welcome'
import CardInfo from '../component/CardInfo'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'


const options = {
  chart: {
    type: 'column' // Use 'column' for a vertical bar chart
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
    title: {
      text: 'Day of the Month' // Add X-axis title here
    }
  },
  yAxis: {
    title: {
      text: 'Amount (in USD)'
    }
  },
  series: [
    {
      name: 'Income',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 10]
    },
    {
      name: 'Outcome',
      data: [2, 3, 2, 4]
    }
  ]
}



const Home = () => {
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
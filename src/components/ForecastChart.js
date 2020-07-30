import { Line,Bar } from 'react-chartjs-2'
import React from 'react'
import arrowIcon from '../assets/flag.svg'


/**
 * Draws the chart which displays the forecast
 * @param {Array} props contains the forecast data fetched 
 * @return {JSX>} the JSX codes for drawing the charts
 */
const ForecastChart = (props)=>{
  let weatherArrayToPlot = {  // Creates the empty 
    cityName:"",
    dt_txt : [],
    temperatureDegreArray:[],
    pressurePascalArray:[],
    humidityPercentArray:[],
    windSpeedMpsArray:[],
    windDirectionDegreArray:[],
    precipitationMMArray:[],
  }
  console.log(props.data);
  for(var i in props.data.list){  // Parses the data, select the data of interest for charts
    weatherArrayToPlot.temperatureDegreArray.push(props.data.list[i].main.temp);
    weatherArrayToPlot.pressurePascalArray.push(props.data.list[i].main.pressure);
    weatherArrayToPlot.humidityPercentArray.push(props.data.list[i].main.humidity);
    weatherArrayToPlot.windSpeedMpsArray.push(props.data.list[i].wind.speed);
    weatherArrayToPlot.windDirectionDegreArray.push(props.data.list[i].wind.deg);
    weatherArrayToPlot.dt_txt.push(props.data.list[i].dt_txt.slice(5,16));
    weatherArrayToPlot.precipitationMMArray.push(props.data.list[i].rain===undefined?0:props.data.list[i].rain["3h"]);
  };
  console.log(weatherArrayToPlot);
  
  const chartPoint = new Image();  // Gets the wind arrow icon for the display of wind direction 
  chartPoint.src = arrowIcon;
  chartPoint.width = 50;
  chartPoint.height = 50;


  //the data and options for drawing the charts
  const temperatureHumidityPrecipitationData = {
    labels: weatherArrayToPlot.dt_txt,
    datasets: [
      {
        label: 'Temperature (℃)',
        yAxisID: 'Hundred',
        type:'line',
        data: weatherArrayToPlot.temperatureDegreArray,
        borderColor: 'rgba(255, 206, 86, 0.4)',
        backgroundColor: 'rgba(255, 206, 86, 0.3)',
        pointBackgroundColor: 'rgba(255, 206, 86, 0.4)',
        pointBorderColor: 'rgba(255, 206, 86, 0.4)'
      },
      {
        label: 'Humidity (%)',
        yAxisID: 'Hundred',
        type:'line',
        data: weatherArrayToPlot.humidityPercentArray,
        borderColor: 'rgba(54, 162, 235, 0.4)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        pointBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        pointBorderColor: 'rgba(54, 162, 235, 0.4)'
      },
      {
        label: 'Percipitation (mm)',
        yAxisID: 'Ten',
        type:'bar',
        data: weatherArrayToPlot.precipitationMMArray,
        borderColor: 'rgba(51, 13, 209, 0.6)',
        backgroundColor: 'rgba(51, 40, 209, 0.6)',
        // hoverBackgroundColor: ['rgba(51, 13, 40, 0.9)'],
        // hoverBorderColor: ['rgba(51, 13, 40, 0.9)']
      }
    ]
  }
  const temperatureHumidityPrecipitationOptions = {
    title: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          id:'Hundred',
          ticks: {
            stepSize: 10,
            fontColor:'rgba(255, 255, 255, 1)',
          },
          position: 'left',
          scaleLabel :{
            display:true,
            labelString:'% / ℃',
            fontColor : 'rgba(255, 255, 255, 1)',
            fontSize : 20
          }
        },
        {
          id:'Ten',
          ticks: {
            stepSize: 5,
            fontColor:'rgba(255, 255, 255, 1)'
          },
          position: 'right',
          scaleLabel :{
            display:true,
            labelString:'mm',
            fontColor : 'rgba(255, 255, 255, 1)',
            fontSize : 20
          }
        }
      ],
      xAxes:[{
        ticks:{
          fontColor:'rgba(255, 255, 255, 0.8)'
        }
      }]
    },
    legend: {
      labels: {
          fontColor: 'white',
          fontSize:20
      }
    }
  }

  const pressureData = {
    labels: weatherArrayToPlot.dt_txt,
    datasets: [
      {
        label: 'Pressure (hPa)',
        data: weatherArrayToPlot.pressurePascalArray,
        borderColor: ['rgba(54, 162, 235, 0.4)'],
        backgroundColor: ['rgba(54, 162, 235, 0.4)'],
        pointBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        pointBorderColor: 'rgba(54, 162, 235, 0.4)',
      }
    ]
  }
  const pressureOptions = {
    title: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 50,
            fontColor:'rgba(255, 255, 255, 1)'
          }
        }
      ],
      xAxes:[{
        ticks:{
          fontColor:'rgba(255, 255, 255, 0.8)'
        }
      }]
    },
    legend: {
      labels: {
          fontColor: 'white',
          fontSize:20
      }
    }
  }

  const windData = {
    labels: weatherArrayToPlot.dt_txt,
    datasets: [
      {
        label: 'Wind Speed (m/s)',
        data: weatherArrayToPlot.windSpeedMpsArray,
        borderColor: ['rgba(54, 162, 235, 0.4)'],
        //backgroundColor: ['rgba(54, 162, 235, 0.4)'],
        pointBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        pointBorderColor: 'rgba(54, 162, 235, 0.4)',
      }
    ]
  }
  const windOptions = {
    title: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            stepSize: 5,
            fontColor:'rgba(255, 255, 255, 0.8)'
          }
        }
      ],
      xAxes:[{
        ticks:{
          fontColor:'rgba(255, 255, 255, 0.8)'
        }
      }]
    },
    legend: {
      labels: {
          fontColor: 'white',
          fontSize:20
      }
    },
    elements: {
      point: {
        rotation:windDirection,
        radius : 10,
        pointStyle : chartPoint
      }
    }
    
  }
  /**
   * Costumize the pointStyle icon to display the wind direction
   * @param {TYPE} the current context of Chart data
   * @return {var} the deg to turn the wind icon
   */
  function windDirection(context)
  {
    return weatherArrayToPlot.windDirectionDegreArray[context.dataIndex];
  }

  return <div>
          <Bar data={temperatureHumidityPrecipitationData} options={temperatureHumidityPrecipitationOptions} />
          <Line data={pressureData} options={pressureOptions} />
          <Line data={windData} options={windOptions} />
        </div>
}

export default ForecastChart


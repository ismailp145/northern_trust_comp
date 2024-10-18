import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const USDGraph = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // To store the chart instance
  const [data, setData] = useState({ labels: [], datasets: [] }); // State to hold chart data

  useEffect(() => {
    // Function to fetch exchange rate data
    const fetchData = async () => {
      const fromCurr = "USD";
      const toCurr = "EUR";

      const API_KEY = 'G2MIX2JQ32DCK3V4'; // Replace with your Alpha Vantage API key
      const url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${fromCurr}&to_symbol=${toCurr}&apikey=${API_KEY}`;

      try {
        const response = await fetch(url);
        const result = await response.json(); // Parse JSON response

        if (result['Error Message']) {
          console.error('Error fetching data:', result['Error Message']);
          return;
        }

        // Process the fetched data
        const weeklyData = result['Time Series FX (Weekly)'];
        const labels = Object.keys(weeklyData);
        const usdData = labels.map(label => parseFloat(weeklyData[label]['4. close'])); // Closing exchange rates

        // Create datasets for the chart
        const chartData = {
          labels: labels.reverse(), // Reversed for correct chronological order
          datasets: [
            {
              label: 'USD to EUR Exchange Rate',
              data: usdData.reverse(), // Reversed to match labels
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              yAxisID: 'y',
            }
          ]
        };

        setData(chartData); // Set the chart data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  // Render the chart after data is fetched
  useEffect(() => {
    if (chartRef.current && data.labels.length > 0) {
      chartInstanceRef.current = new Chart(chartRef.current, {
        type: 'line',
        data,
        options: {
          locale: 'en-US',
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumSignificantDigits: 3
                  }).format(value);
                }
              }
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div className="container" style={{ backgroundColor: 'white', padding: '20px' }}>
      <div className="chartMenu">
        <p>EUR to USD Exchange Rates Chart (Weekly)</p>
      </div>
      <div className="chartCard">
        <div className="chartBox">
          <canvas ref={chartRef} id="myChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default USDGraph;

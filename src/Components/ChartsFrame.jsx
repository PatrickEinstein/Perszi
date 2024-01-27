import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { PieChartsData } from "../ChartsData.js/PieChartData";
import { Line,Bar } from "react-chartjs-2";

export const ChartsFrame = () => {
  const [chatData, setChatdata] = useState({
    labels: PieChartsData.map((obj) => obj.year),
    // labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        data: PieChartsData.map((obj) => obj.userGain),
      },
    ],
  });

  return (
    <div
      style={{
        height: 500,
        width: 500,
      }}
    >
      <Line data={chatData} />
      <Bar data={chatData} />
    </div>
  );
};



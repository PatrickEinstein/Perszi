import React, { useState } from "react";
import {
  Bar,
  Pie,
  Line,
  Radar,
  Bubble,
} from "react-chartjs-2";
import { PieChartsData } from "../ChartsData.js/PieChartData";
import {  Stack } from "@mui/material";

const ChartSkeleton = () => {
  const [userData, setUserData] = useState({
    labels: PieChartsData.map((data) => data.year),
    datasets: [
      {
        data: PieChartsData.map((data) => data.userGain),
      },
    ],
  });

  return (

      <Stack direction="row" spacing={10} justifyContent="space-between" alignItems="center">
        <Stack>
          <Stack>
            <Bar
              data={userData}
              options={{
                // aspectRatio: 1,
                animation: {
                  duration: 5000,
                },
              }}
            />
          </Stack>
          <Stack>
            <Radar
              data={userData}
              options={{
                // aspectRatio: 1,
                animation: {
                  duration: 5000,
                },
              }}
            />
          </Stack>
          <Stack>
            <Bubble
              data={userData}
              options={{
                // aspectRatio: 1,
                animation: {
                  duration: 5000,
                },
              }}
            />
          </Stack>
          <Stack>
            <Line
              data={userData}
              options={{
                // aspectRatio: 1,
                animation: {
                  duration: 5000,
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack>
          <Stack direction="row">
            <Stack>
              <Pie
                data={userData}
                options={{
                  aspectRatio: 1,
                  animation: {
                    duration: 5000,
                  },
                }}
                width={300}
                height={300}
              />
            </Stack>
            <Stack>
              <Pie
                data={userData}
                options={{
                  aspectRatio: 1,
                  animation: {
                    duration: 5000,
                  },
                }}
                width={300}
                height={300}
              />
            </Stack>
          </Stack>
          <Stack height={300} width={300}>
            <Bar
              data={userData}
              options={{
                // aspectRatio: 1,
                animation: {
                  duration: 5000,
                },
              }}
              height={200}
              width={400}
            />
          </Stack>
        </Stack>
      </Stack>
    
  );
};

export default ChartSkeleton;

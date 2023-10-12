import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartVertexType, historyChartProps } from "types/Monitoring.types";
import styles from "../../../../../sass/styles.module.scss";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const HistoryChart = (props: historyChartProps) => {
  const { chartData, deviceThreshold, metric } = props;
  const [chartVertices, setChartVertices] = useState<chartVertexType[]>();
  useEffect(() => {
    const chartVertex: chartVertexType[] = [];
    for (let i = 0; i < chartData.length; i++) {
      if (metric === "Vibration") {
        chartVertex.push({
          peakValue: deviceThreshold?.vibration?.red as number,
          averageValue: deviceThreshold?.vibration?.yellow as number,
          goodValue: deviceThreshold?.vibration?.green as number,
          presentValue: Number(chartData[i].value),
          time: chartData[i].time,
        });
      } else if (metric === "Noise") {
        chartVertex.push({
          peakValue: deviceThreshold?.noise?.red as number,
          averageValue: deviceThreshold?.noise?.yellow as number,
          goodValue: deviceThreshold?.noise?.green as number,
          presentValue: Number(chartData[i].value),
          time: chartData[i].time,
        });
      } else {
        chartVertex.push({
          peakValue: deviceThreshold?.temperature?.red as number,
          averageValue: deviceThreshold?.temperature?.yellow as number,
          goodValue: deviceThreshold?.temperature?.green as number,
          presentValue: Number(chartData[i].value),
          time: chartData[i].time,
        });
      }
    }
    setChartVertices(chartVertex);
  }, [chartData]);

  return (
    <Box height="500px">
        <>
          <Typography
            variant="h5"
            marginY="1.5rem"
            color={styles.trout}
            sx={{ display: "flex", width: "fit-content", alignItems: "start" }}
          >
            {metric} History Chart :-
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={100} height={100} data={chartVertices}>
              <CartesianGrid strokeDasharray="3 3" />
              <defs>
                <linearGradient id="presentColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={styles.primaryColor}
                    stopOpacity={1}
                  />
                  <stop
                    offset="95%"
                    stopColor={styles.primaryColor}
                    stopOpacity={1}
                  />
                </linearGradient>
                <linearGradient id="peakColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={styles.errorMainColor}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={styles.errorMainColor}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="goodColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={styles.successMainColor}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={styles.successMainColor}
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient id="averageColor" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={styles.darkYellowColor}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={styles.darkYellowColor}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                angle={chartData.length > 5 ? -90 : -45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" layout="vertical" align="right" />
              <Area
                type="monotone"
                dataKey="peakValue"
                stroke={styles.errorMainColor}
                fill="url(#peakColor)"
              />
              <Line
                type="monotone"
                dataKey="presentValue"
                fill="url(#presentColor)"
                stroke={styles.primaryColor}
              />
              <Area
                type="monotone"
                dataKey="averageValue"
                fill="url(#averageColor)"
                stroke={styles.darkYellowColor}
              />
              <Area
                type="monotone"
                dataKey="goodValue"
                stroke={styles.successMainColor}
                fill="url(#goodColor)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </>
    </Box>
  );
};

export default HistoryChart;

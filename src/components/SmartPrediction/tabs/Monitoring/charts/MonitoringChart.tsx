import { Box, Grid } from "@mui/material";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import { statusColor } from "components/SmartPrediction/SmartPredictionData";
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, Scatter } from "recharts";
import styles from "../../../../../sass/styles.module.scss";
import { monitoringChartProps } from "types/Monitoring.types";

const MonitoringChart = (props:monitoringChartProps) => {
    const {chartData, status} = props;
    return (
    <Box sx={smartPredictionStyles.vibrationTab}>
    <Grid container display="flex" justifyContent={"center"}>
      <Grid
        item
        md={3}
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={5}
      >
        <h4>Current Value : {chartData?.[0]?.presentValue}</h4>
      </Grid>
      <Grid
        item
        md={3}
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={5}
      >
        <h4>Status :</h4>
        <Box sx={smartPredictionStyles.vibrationStatus}>
          <Box
            height="100%"
            width="100%"
            sx={{ backgroundColor: statusColor(status)}}
          ></Box>
        </Box>
      </Grid>
      <Grid item md={10} xs={12} height="25rem" marginTop="2rem">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart width={100} height={100} data={chartData}>
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
            <XAxis dataKey="xAxis" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" layout="vertical" align="right" />
            <Area
              type="monotone"
              dataKey="peakValue"
              stroke={styles.errorMainColor}
              fill="url(#peakColor)"
            />
            <Scatter
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
      </Grid>
    </Grid>
  </Box>
    );
};

export default MonitoringChart;
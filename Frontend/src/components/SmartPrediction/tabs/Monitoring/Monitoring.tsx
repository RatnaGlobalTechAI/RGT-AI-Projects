import { useEffect, useState } from "react";
import { FormControl, FormLabel, Grid, MenuItem, Select, SelectChangeEvent, Tab, Tabs, Typography } from "@mui/material";
import { smartPredictionStyles } from "../../SmartPrediction.styles";
import {
  TabPanel,
  a11yProps,
} from "../../SmartPredictionData";
import { getDeviceData, getDeviceNames, getDeviceThreshold } from "service/monitorService";
import MonitoringChart from "./charts/MonitoringChart";
import { deviceDataType, realTimeDataType, thresholdType } from "types/Monitoring.types";
import styles from "../../../../sass/styles.module.scss";

const VibrationChart = () => {
  const [deviceThreshold, setDeviceThreshold] = useState<thresholdType>();
  const [deviceData, setDeviceData] = useState<deviceDataType>();
  const [chartData, setChartData] = useState<realTimeDataType[]>();
  const [isDeviceNamesFetching, setIsDeviceNamesFetching] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<number>(0);
  const [deviceNames, setDeviceNames] = useState<string[]>();
  const [deviceName, setDeviceName] = useState<string>();

  const handleDeviceSelect = (event: SelectChangeEvent) => {
    setDeviceName(event.target.value as string);
  };
  const handleTabChange = (event: React.SyntheticEvent, val: number): void => {
    setTabValue(val);
  };

  // function to fetch device names
  const getDeviceName = async () => {
    setIsDeviceNamesFetching(true);
    const response : {name : string}[] = await getDeviceNames();
    const names : string[] = [];
    response?.forEach((device)=>{
      names.push(device?.name);
    });
    setDeviceNames(names);
    setDeviceName(names[0]);
    setIsDeviceNamesFetching(false);
  };

  // function to get threshold data
  const getThresholdData = async () => {
    if(deviceName){
      const response = await getDeviceThreshold(deviceName);
      //eslint-disable-next-line
      console.log(response)
      if (response) {
        setDeviceThreshold(response);
      }
    }
  };

  // function to get device data
  const getMonitorData = async () => {
    if(deviceName){
      const response = await getDeviceData(deviceName);
      //eslint-disable-next-line
      console.log(response)
      if (response) {
        if(tabValue===0){
          setDeviceData(response?.telemetryDataPoints[1]);
        }else if(tabValue===1){
          setDeviceData(response?.telemetryDataPoints[2]);
        }else{
          setDeviceData(response?.telemetryDataPoints[0]);
        }
      }
    }
  };

  useEffect(() => {
    getMonitorData();
    getThresholdData();
  }, [deviceName, tabValue]);

  //function that will call the apis for every one minute change
  useEffect(() => {
    let lastMinute = new Date().getMinutes();
    const intervalId = setInterval(() => {
      const currentMinute = new Date().getMinutes();
      if (currentMinute !== lastMinute) {
        lastMinute = currentMinute;
        getMonitorData();
        getThresholdData();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //eslint-disable-next-line
  console.log(deviceThreshold)

  useEffect(() => {
    if(tabValue===0){
      setChartData([
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.vibration?.yellow),
          goodValue: Number(deviceThreshold?.vibration?.green),
        },
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.vibration?.yellow),
          goodValue: Number(deviceThreshold?.vibration?.green),
          xAxis: deviceData?.date,
          presentValue: deviceData?.vibration,
        },
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.vibration?.yellow),
          goodValue: Number(deviceThreshold?.vibration?.green),
        },
      ]);
    }else if(tabValue===1){
      setChartData([
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.noise?.yellow),
          goodValue: Number(deviceThreshold?.noise?.green),
        },
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.noise?.yellow),
          goodValue: Number(deviceThreshold?.noise?.green),
          xAxis: deviceData?.date,
          presentValue: deviceData?.noise,
        },
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.noise?.yellow),
          goodValue: Number(deviceThreshold?.noise?.green),
        },
      ]);
    }else{
      setChartData([
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.temperature?.yellow),
          goodValue: Number(deviceThreshold?.temperature?.green),
        },
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.temperature?.yellow),
          goodValue: Number(deviceThreshold?.temperature?.green),
          xAxis: deviceData?.date,
          presentValue: deviceData?.temperature,
        },
        {
          peakValue: 100,
          averageValue: Number(deviceThreshold?.temperature?.yellow),
          goodValue: Number(deviceThreshold?.temperature?.green),
        },
      ]);
    }
  }, [deviceThreshold, deviceData]);
  
  useEffect(()=>{
    getDeviceName();
  },[]);

  return (
    <>
    <Grid container sx={smartPredictionStyles.monitorFormsSection}>
      <Grid item md={12} xs={12} gap={5}>
        {
          isDeviceNamesFetching ? 
          (
            <>Loading...</>
          ) :
          (
            <FormControl >
              <FormLabel>Device</FormLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleDeviceSelect}
                value={deviceName}
                defaultValue={deviceNames?.[0] as string}
              >
                {
                  deviceNames?.map((name,index)=>(
                      <MenuItem key={index} value={name}>{name}</MenuItem>
                  ))
                }
                </Select>
            </FormControl>
          )
        }
      </Grid>
    </Grid>
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      aria-label="basic tabs example"
    >
      <Tab label="Vibration" {...a11yProps(0)} />
      <Tab label="Noise" {...a11yProps(1)} />
      <Tab label="Temperature" {...a11yProps(2)} />
    </Tabs>
    <TabPanel value={tabValue} index={0}>
      <Typography
        variant="h5"
        marginY="1.5rem"
        color={styles.trout}
        sx={{ display: "flex", width: "fit-content", alignItems: "start" }}
      >
        Vibration Chart :-
      </Typography>
      <MonitoringChart chartData={chartData as realTimeDataType[]}  status={deviceData?.status as string}  />
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      <Typography
        variant="h5"
        marginY="1.5rem"
        color={styles.trout}
        sx={{ display: "flex", width: "fit-content", alignItems: "start" }}
      >
        Noise Chart :-
      </Typography>
      <MonitoringChart chartData={chartData as realTimeDataType[]}  status={deviceData?.status as string}  />
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      <Typography
        variant="h5"
        marginY="1.5rem"
        color={styles.trout}
        sx={{ display: "flex", width: "fit-content", alignItems: "start" }}
      >
        Temperature Chart :-
      </Typography>
      <MonitoringChart chartData={chartData as realTimeDataType[]}  status={deviceData?.status as string}  />
    </TabPanel>
    </>
  );
};

export default VibrationChart;

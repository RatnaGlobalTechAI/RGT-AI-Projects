import {
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
} from "@mui/material";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import { useEffect, useState } from "react";
import {
  TabPanel,
  a11yProps,
  deviceHistoryColumns,
  getPreviousTimeStamps,
} from "components/SmartPrediction/SmartPredictionData";
import DatePicker from "../../modals/DatePicker";
import {
  betweenDatesType,
  deviceHistoriesType,
  deviceHistoryType,
  recordsRangeType,
} from "types/Monitoring.types";
import { getDeviceHistory, getDeviceNames } from "service/monitorService";

const History = () => {
  const [tabValue, setTabValue] = useState<number>(0);
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [deviceName, setDeviceName] = useState<string>();
  const [deviceNames, setDeviceNames] = useState<string[]>();
  const [dateRange, setDateRange] = useState<string>("7");
  const [previousDates, setPreviousDates] = useState<betweenDatesType>();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 2,
  });
  const [tableIndex, setTableIndex] = useState<recordsRangeType>({
    start: 1,
    end: paginationModel.pageSize,
  });
  const [deviceHistoryRows, setDeviceHistoryRows] = useState<
    deviceHistoryType[]
  >([]);
  const [totalCount, setTotalCount] = useState<number>(7);
  const [param, setParam] = useState("vibration");
  let counter = 0;
  
  // function to fetch device names
  const getDeviceName = async () => {
    const response : {name : string}[] = await getDeviceNames();
    const names : string[] = [];
    response?.forEach((device)=>{
      names.push(device?.name);
    });
    setDeviceNames(names);
    setDeviceName(names[0]);
  };

  // function to fetch the records
  const fetchDeviceTableHistory = async () => {
    if(deviceName){
      const deviceHistory: deviceHistoryType[] = [];
      const response: deviceHistoriesType = await getDeviceHistory(
        deviceName as string,
        previousDates?.firstTimestamp as number,
        previousDates?.lastTimestamp as number,
        tableIndex.start,
        tableIndex.end > totalCount ? totalCount : tableIndex.end,
        param
      );
      for (let j = 0; j < response.telemetryDataPoints?.length; j++) {
        counter = counter + 1;
        if (tabValue === 0) {
          deviceHistory.push({
            id: 1,
            status: response.telemetryDataPoints[j].status,
            time: response.telemetryDataPoints[j].date,
            value: response.telemetryDataPoints[j].vibration,
            key: response?.telemetryDataPoints?.[j]?.date,
          });
        } else if (tabValue === 1) {
          deviceHistory.push({
            id: 1,
            status: response.telemetryDataPoints[j].status,
            time: response.telemetryDataPoints[j].date,
            value: response.telemetryDataPoints[j].noise,
            key: response?.telemetryDataPoints?.[j]?.date,
          });
        } else if (tabValue === 2) {
          deviceHistory.push({
            id: 1,
            status: response.telemetryDataPoints[j].status,
            time: response.telemetryDataPoints[j].date,
            value: response.telemetryDataPoints[j].temperature,
            key: response?.telemetryDataPoints?.[j]?.date,
          });
        }
      }
      setDeviceHistoryRows([...deviceHistory]);
    }
  };

  // function to change the device
  const handleDeviceSelect = (event: SelectChangeEvent) => {
    resetFilters();
    setDeviceName(event.target.value as string);
  };

  // function to switch the tabs
  const handleTabChange = (event: React.SyntheticEvent, val: number): void => {
    if(val===0){
      setParam("vibration");
    }else if(val===1){
      setParam("noise");
    }else{
      setParam("temperature");
    }
    setTabValue(val);
    setPreviousDates(getPreviousTimeStamps(7));
  };

  // function to change the date
  const handleDateChange = (event: SelectChangeEvent): void => {
    setDeviceHistoryRows([]);
    if (event.target.value !== "Custom Date Range") {
      setDateRange(event.target.value);
      setTotalCount(Number(event.target.value));
    } else {
      setDateRange(event.target.value);
    }
  };

  // function will execute when we change the page
  const handlePagination = (e: unknown, newPage: number) => {
    setPaginationModel((pre) => ({
      ...pre,
      page: newPage,
    }));
    if (paginationModel.page < newPage) {
      setTableIndex({
        start: tableIndex.end + 1,
        end:
          totalCount < tableIndex.end + paginationModel.pageSize
            ? totalCount
            : tableIndex.end + paginationModel.pageSize,
      });
    } else {
      setTableIndex({
        start: tableIndex.start - paginationModel.pageSize,
        end: tableIndex.start - 1,
      });
    }
  };

  // function which will set all the filters to initial state when executed
  const resetFilters = () => {
    setDateRange("7");
    setTableIndex({
      start: 1,
      end: 2,
    });
    setPaginationModel({ page: 0, pageSize: 2 });
    setDeviceName("");
    setTotalCount(7);
  };

  //this will change rows in page when we switch pagination tabs
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTableIndex({
      start: 1,
      end: Number(event.target.value),
    });
    setPaginationModel({
      page: 0,
      pageSize: Number(event.target.value),
    });
  };

  // useEffect compoent which will get all the time stamps of the initial date range
  useEffect(() => {
    setPreviousDates(getPreviousTimeStamps(Number(dateRange)));
  }, []);

  // useEffect component which will call the fetch device history method when the table index is modified
  useEffect(() => {
    if (previousDates?.firstTimestamp && previousDates.lastTimestamp) {
      fetchDeviceTableHistory();
    }
  }, [tableIndex, previousDates, deviceName]);

  // useEffect method which will be trigerred once we change the date
  useEffect(() => {
    setTableIndex({
      start: 1,
      end: 2,
    });
    setPaginationModel({ page: 0, pageSize: 2 });
    setPreviousDates(getPreviousTimeStamps(Number(dateRange)));
  }, [dateRange]);

  useEffect(()=>{
    getDeviceName();
  },[]);

  return (
    <>
      <Grid container sx={smartPredictionStyles.monitorFormsSection}>
        <Grid item md={6} xs={12} gap={5}>
          <FormControl>
            <FormLabel>Device</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deviceName}
              onChange={handleDeviceSelect}
              defaultValue={deviceName}
            >
            {
              deviceNames?.map((name,index)=>(
                  <MenuItem key={index} value={name}>{name}</MenuItem>
              ))
            }
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} xs={12} gap={5}>
          <FormControl>
            <FormLabel>Date Range</FormLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dateRange}
              onChange={handleDateChange}
              defaultValue={dateRange}
            >
              <MenuItem value={7}>Last 7 Days</MenuItem>
              <MenuItem value={30}>Last Month</MenuItem>
              <MenuItem
                value={"Custom Date Range"}
                onClick={() => setOpenDatePicker(true)}
              >
                Custom Date Range
              </MenuItem>
            </Select>
          </FormControl>
          <DatePicker
            setDataRange={setTableIndex}
            setPaginationModel={setPaginationModel}
            setRows={setDeviceHistoryRows}
            setPreviousDates={setPreviousDates}
            handleClose={() => setOpenDatePicker(false)}
            open={openDatePicker}
          />
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
        <Grid container gap={5}>
          <Grid item md={12} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {deviceHistoryColumns?.map((column, index) => (
                      <TableCell key={index}>{column.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                    <TableBody>
                      {deviceHistoryRows?.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.time}</TableCell>
                          <TableCell>{row.value}</TableCell>
                          <TableCell>{row.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 4]}
              component="div"
              count={totalCount}
              rowsPerPage={paginationModel.pageSize}
              page={paginationModel.page}
              onPageChange={handlePagination}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Grid container gap={5}>
          <Grid item md={12} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {deviceHistoryColumns?.map((column, index) => (
                      <TableCell key={index}>{column.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deviceHistoryRows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 4]}
              component="div"
              count={totalCount}
              rowsPerPage={paginationModel.pageSize}
              page={paginationModel.page}
              onPageChange={handlePagination}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <Grid container gap={5}>
          <Grid item md={12} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {deviceHistoryColumns?.map((column, index) => (
                      <TableCell key={index}>{column.headerName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deviceHistoryRows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.time}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2, 4]}
              component="div"
              count={totalCount}
              rowsPerPage={paginationModel.pageSize}
              page={paginationModel.page}
              onPageChange={handlePagination}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default History;

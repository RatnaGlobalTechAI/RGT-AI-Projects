import {
    Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import {
  deviceNotificationColumns,
  getPreviousTimeStamps,
} from "components/SmartPrediction/SmartPredictionData";
import DatePicker from "components/SmartPrediction/modals/DatePicker";
import { successHandler } from "genericComponents/toaster/toaster";
import { useEffect, useState } from "react";
import { acknowledgeDeviceNotification, getDeviceNotifications } from "service/monitorService";
import {
  betweenDatesType,
  deviceNotificationType,
  paginationType,
  recordsRangeType,
} from "types/Monitoring.types";
import styles from "../../../../sass/styles.module.scss";

const Notifications = () => {
  const [paginationModel, setPaginationModel] = useState<paginationType>({
    page: 0,
    pageSize: 2,
  });
  const [totalCount, setTotalCount] = useState<number>(7);
  const [tableIndex, setTableIndex] = useState<recordsRangeType>({
    start: 1,
    end: 2,
  });
  const [deviceName, setDeviceName] = useState<string>("device1");
  const [dateRange, setDateRange] = useState<string>("8");
  const [previousDates, setPreviousDates] = useState<betweenDatesType>();
  const [deviceNotificationRows, setDeviceNotificationRows] =
    useState<deviceNotificationType[]>();
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [acknowledgeIds, setAcknowledgeIds] = useState<string[]>([]);
  const [actionButtonState, setActionButtonState] = useState({
    acknowledge: true,
    clear: true,
  });

  // function to change the device
  const handleDeviceSelect = (event: SelectChangeEvent) => {
    setDeviceName(event.target.value as string);
    setPreviousDates(getPreviousTimeStamps(8));
  };

  // function to change the date
  const handleDateChange = (event: SelectChangeEvent): void => {
    setDeviceNotificationRows([]);
    if (event.target.value !== "Custom Date Range") {
      setDateRange(event.target.value);
      setTotalCount(Number(event.target.value));
    } else {
      setDateRange(event.target.value);
    }
  };

  const fetchDeviceNotifications = async () => {
    const deviceNotifications: deviceNotificationType[] = [];
    const response: deviceNotificationType[] = await getDeviceNotifications(
      deviceName,
      previousDates?.firstTimestamp as number,
      previousDates?.lastTimestamp as number,
      tableIndex.start,
      tableIndex.end,
    );
    for (let i = 0; i < response?.length; i++) {
      deviceNotifications.push({
        id: response?.[i]?.id,
        message: response?.[i]?.message,
        date: response?.[i]?.date,
        acknowledge: response?.[i]?.acknowledge,
        clear: response?.[i]?.clear,
        key: response?.[i]?.date,
      });
    }
    setDeviceNotificationRows([...deviceNotifications]);
  };

  
  // function to acknowledge notifications
  const acknowledgeNotification = async (id: string[]) => {
    const response = await acknowledgeDeviceNotification(deviceName,id);
    if (response) {
        fetchDeviceNotifications();
        successHandler(response);
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
  
  const onRowSelectionModelChange = (id: string)  => {
    if(acknowledgeIds.includes(id)){
        const acknowledgedId = acknowledgeIds.filter((val)=>val!==id);
        setAcknowledgeIds(acknowledgedId);
    }else{
        setAcknowledgeIds([...acknowledgeIds,id]);
    }
  };

  useEffect(()=>{
    if (acknowledgeIds.length > 0) {
      setActionButtonState({
        acknowledge: false,
        clear: false,
      });
    } else {
      setActionButtonState({
        acknowledge: true,
        clear: true,
      });
    }
    },[acknowledgeIds]);

  useEffect(() => {
    setPreviousDates(getPreviousTimeStamps(Number(dateRange)));
  }, []);

  useEffect(() => {
    if (previousDates?.firstTimestamp && previousDates?.lastTimestamp) {
      fetchDeviceNotifications();
    }
  }, [tableIndex, previousDates]);
  
  // useEffect method which will be trigerred once we change the date
  useEffect(() => {
    setTableIndex({
      start: 1,
      end: 2,
    });
    setPaginationModel({ page: 0, pageSize: 2 });
    setPreviousDates(getPreviousTimeStamps(Number(dateRange)));
  }, [dateRange]);

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
              <MenuItem value={"device1"}>Device 1</MenuItem>
              <MenuItem value={"device2"}>Device 2</MenuItem>
              <MenuItem value={"device3"}>Device 3</MenuItem>
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
              <MenuItem value={8}>Last 7 Days</MenuItem>
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
            setRows={setDeviceNotificationRows}
            setPreviousDates={setPreviousDates}
            handleClose={() => setOpenDatePicker(false)}
            open={openDatePicker}
          />
        </Grid>
      </Grid>
      <Box padding="1rem">
      <Box  display="flex" justifyContent="space-between">
            <Typography
              variant="h5"
              color={styles.trout}
              sx={{
                display: "flex",
                width: "fit-content",
                alignItems: "center",
              }}
            >
              Notifications Table :-
            </Typography>
            <Box
              display="flex"
              justifyContent="end"
              gap={2}
              paddingY="0.5rem"
              width="fit-content"
            >
              <Button
                disabled={actionButtonState.acknowledge}
                onClick={() => {
                  acknowledgeNotification(acknowledgeIds as string[]);
                  setActionButtonState({
                    acknowledge: true,
                    clear: true,
                  });
                  setAcknowledgeIds([]);
                }}
                sx={{
                  backgroundColor: actionButtonState.acknowledge
                    ? styles.grayColor
                    : styles.primaryColor,
                }}
              >
                Acknowledge
              </Button>
              <Button
                disabled={actionButtonState.clear}
                sx={{
                  backgroundColor: actionButtonState.clear
                    ? styles.grayColor
                    : styles.primaryColor,
                }}
              >
                Clear
              </Button>
            </Box>
          </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {deviceNotificationColumns?.map((column, index) => (
                <TableCell key={index}>{column?.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
                <TableBody>
                  {deviceNotificationRows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row?.id}</TableCell>
                      <TableCell>{row?.date}</TableCell>
                      <TableCell>{row?.message}</TableCell>
                      <TableCell>
                        <Checkbox defaultChecked={row?.acknowledge} onClick={()=>onRowSelectionModelChange(row?.id)} />
                      </TableCell>
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
      </Box>
    </>
  );
};

export default Notifications;

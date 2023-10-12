import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { dateRangeProps, dateRangeType } from "types/Monitoring.types";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import { Close } from "@mui/icons-material";
import { getDatesBetween } from "components/SmartPrediction/SmartPredictionData";

const DatePicker = (props: dateRangeProps) => {
  const {
    open,
    handleClose,
    setPreviousDates,
    setRows,
    setDataRange,
    setPaginationModel,
  } = props;
  const [dateRange, setDateRange] = useState<dateRangeType>();
  const applyDates = () => {
    setRows([]);
    setPaginationModel({ page: 0, pageSize: 5 });
    setDataRange({
      start: 0,
      end: 5,
    });
    setPreviousDates(
      getDatesBetween(dateRange?.startDate as Date, dateRange?.endDate as Date),
    );
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={smartPredictionStyles.datePickerModal}
    >
      <Box>
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Date Range
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item md={4} xs={12}>
            <label>
              <h4>Start Date</h4>
            </label>
            <TextField
              type="date"
              onChange={(e) =>
                setDateRange((pre) => ({
                  ...pre,
                  startDate: new Date(e.target.value),
                }))
              }
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <label>
              <h4>End Date</h4>
            </label>
            <TextField
              type="date"
              onChange={(e) =>
                setDateRange((pre) => ({
                  ...pre,
                  endDate: new Date(e.target.value),
                }))
              }
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Button variant="contained" onClick={() => applyDates()}>
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DatePicker;

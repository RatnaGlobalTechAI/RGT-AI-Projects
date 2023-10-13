import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import { deviceNotificationColumns } from "components/SmartPrediction/SmartPredictionData";
import { notificationTableProps } from "types/Monitoring.types";
import styles from "../../../../../sass/styles.module.scss";
import { useState } from "react";

const NotificationsTable = (props: notificationTableProps) => {
  const {
    handlePagination,
    deviceNotificationRows,
    totalCount,
    paginationModel,
    isLoading,
    acknowledgeNotification,
  } = props;
  const [actionButtonState, setActionButtonState] = useState({
    acknowledge: true,
    clear: true,
  });
  const [acknowledgeIds, setAcknowledgeIds] = useState<GridRowSelectionModel>();
  return (
    <Box>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between">
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
                  acknowledgeNotification(acknowledgeIds);
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
          <DataGrid
            rows={deviceNotificationRows}
            columns={deviceNotificationColumns}
            getRowId={(row) => row.key}
            rowCount={totalCount}
            onPaginationModelChange={handlePagination}
            initialState={{
              pagination: {
                paginationModel: paginationModel,
              },
            }}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            disableColumnMenu
            checkboxSelection
            rowSelectionModel={acknowledgeIds}
            sx={smartPredictionStyles.table}
            onRowSelectionModelChange={(id) => {
              setAcknowledgeIds(id);
              if (id.length > 0) {
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
            }}
          />
        </>
      )}
    </Box>
  );
};

export default NotificationsTable;

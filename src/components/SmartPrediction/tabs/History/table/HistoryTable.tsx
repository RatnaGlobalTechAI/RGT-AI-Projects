import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import { deviceHistoryColumns } from "components/SmartPrediction/SmartPredictionData";
import { vibrationHistoryProps } from "types/Monitoring.types";
import styles from "../../../../../sass/styles.module.scss";

const HistoryTable = (props: vibrationHistoryProps) => {
  const {
    isLoading,
    deviceHistoryRows,
    totalCount,
    handlePagination,
    paginationModel,
    tableName,
  } = props;
  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <Typography
            variant="h5"
            marginBottom="1rem"
            color={styles.trout}
            sx={{ display: "flex", width: "fit-content", alignItems: "start" }}
          >
            {tableName} History Table :-
          </Typography>
          <DataGrid
            rows={deviceHistoryRows}
            columns={deviceHistoryColumns}
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
            sx={smartPredictionStyles.table}
          />
        </>
      )}
    </>
  );
};

export default HistoryTable;

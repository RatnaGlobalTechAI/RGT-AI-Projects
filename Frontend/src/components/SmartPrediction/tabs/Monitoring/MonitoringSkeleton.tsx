import { FormControl, FormLabel, Grid, Select, Skeleton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import { TabPanel } from "components/SmartPrediction/SmartPredictionData";
import styles from "../../../../sass/styles.module.scss";

const MonitorSkeleton = () => (
    <>
    <Grid container sx={smartPredictionStyles.monitorFormsSection}>
        <Skeleton animation={false}>
        <Grid item md={12} xs={12} gap={5}>
          <FormControl>
            <FormLabel>Device</FormLabel>
            <Select>
            </Select>
          </FormControl>
        </Grid>
        </Skeleton>
    </Grid>
      <Tabs
        aria-label="basic tabs example"
      >
        <Stack gap={5} direction="row">
        <Skeleton  animation={false}>
        <Tab label="Vibration"  />
        </Skeleton>
        <Skeleton  animation={false}>
        <Tab label="Vibration"  />
        </Skeleton>
        <Skeleton  animation={false}>
        <Tab label="Vibration"  />
        </Skeleton>
        </Stack>
      </Tabs>
      <TabPanel value={0} index={0}>
        <Skeleton animation={"pulse"}>
        <Typography
          variant="h5"
          marginY="1.5rem"
          color={styles.trout}
          sx={{ display: "flex", width: "fit-content", alignItems: "start" }}
        >
          Vibration Chart :-
        </Typography>
        </Skeleton>
        <Skeleton animation={"pulse"}>
        </Skeleton>
      </TabPanel>
    </>
);

export default MonitorSkeleton;
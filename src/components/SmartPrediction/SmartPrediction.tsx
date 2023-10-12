// Library imports
import {
  Box,
  Grid,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  AppBar,
  IconButton,
} from "@mui/material";
// Local imports
import { smartPredictionStyles } from "./SmartPrediction.styles";
import { ArrowBack } from "@mui/icons-material";
import styles from "../../sass/styles.module.scss";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import History from "./tabs/History/History";
import Notifications from "./tabs/Notifications/Notifications";
import Settings from "./tabs/Settings/Settings";
import VibrationChart from "./tabs/Monitoring/Monitoring";

const SmartPrediction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [tabState, setTabState] = useState<number>();
  useEffect(() => {
    if (pathname === ("/" || "/monitor")) {
      setTabState(1);
    } else if (pathname === "/history") {
      setTabState(2);
    } else if (pathname === "/notifications") {
      setTabState(3);
    } else if (pathname === "/settings") {
      setTabState(4);
    }
  }, [location.pathname]);
  // function to handle the drawer tabs change
  const handleDrawerTabs = (val: string) => {
    if (val === "Monitor") {
      navigate("/");
    } else if (val === "History") {
      navigate("/history");
    } else if (val === "Notifications") {
      navigate("/notifications");
    } else if (val === "Settings") {
      navigate("/settings");
    }
  };
  return (
    <Box sx={smartPredictionStyles.monitorTab}>
      <AppBar position="fixed">
        <Grid container>
          <Grid item lg={1}>
            <IconButton>
              <ArrowBack color={styles.primaryColor} />
            </IconButton>
          </Grid>
          <Grid item lg={11}>
            <Typography variant="h4">
              Smart Predictive Maintainance System
            </Typography>
          </Grid>
        </Grid>
      </AppBar>
      <Drawer
        sx={smartPredictionStyles.drawer}
        variant="permanent"
        anchor="left"
      >
        <List>
          {[
            "Monitor",
            "History",
            "Notifications",
            "Settings",
          ].map((text, index) => (
            <>
              <ListItem
                key={text}
                disablePadding
                onClick={() => handleDrawerTabs(text)}
              >
                <ListItemButton selected={tabState === index + 1}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={smartPredictionStyles.mainContent}>
        {tabState === 1 && <VibrationChart />}
        {tabState === 2 && <History />}
        {tabState === 3 && <Notifications />}
        {tabState === 4 && <Settings />}
      </Box>
    </Box>
  );
};

export default SmartPrediction;

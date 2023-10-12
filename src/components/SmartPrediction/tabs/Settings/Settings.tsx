/* eslint-disable no-nested-ternary */
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import styles from "../../../../sass/styles.module.scss";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import {
  getConfigurationDetails,
  setConfigurationDetails,
} from "service/monitorService";
import { useEffect, useState } from "react";
import {
  configurationDetailsType,
  notificationType,
  thresholdType,
} from "types/Monitoring.types";

const Settings = () => {
  const [configurationDetails, setconfigurationDetails] =
    useState<configurationDetailsType>();
  const [modifiedConfiguration, setModifiedConfiguration] =
    useState<configurationDetailsType>();
  const [clearConfiguration, setClearConfiguration] = useState<boolean>(true);
  const [isActionButtonActive, setIsActionButtonActive] =
    useState<boolean>(false);

  // function to fetch configuration details
  const fetchConfigurationDetails = async () => {
    const response = await getConfigurationDetails();
    if (response) {
      setClearConfiguration(false);
      setconfigurationDetails(response);
      setModifiedConfiguration(response);
      setIsActionButtonActive(false);
    }
  };

  // function to set configuration details
  const applyConfigurationDetails = async () => {
    const response = await setConfigurationDetails(
      modifiedConfiguration as configurationDetailsType,
    );
    if (response) {
      setIsActionButtonActive(false);
    }
  };

  //function to handle change in threshold fields
  const handleChangeThresholdConfiguration = (
    e: React.ChangeEvent<HTMLInputElement>,
    threshold: string,
    metric: string,
  ) => {
    if (threshold === "vibration" && metric === "green") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          vibration: {
            ...pre?.thresholds.vibration,
            green: Number(e.target.value),
          },
        },
      }));
    } else if (threshold === "vibration" && metric === "yellow") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          vibration: {
            ...pre?.thresholds.vibration,
            yellow: Number(e.target.value),
          },
        },
      }));
    } else if (threshold === "noise" && metric === "green") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          noise: { ...pre?.thresholds.noise, green: Number(e.target.value) },
        },
      }));
    } else if (threshold === "noise" && metric === "yellow") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          noise: { ...pre?.thresholds.noise, yellow: Number(e.target.value) },
        },
      }));
    } else if (threshold === "temperature" && metric === "green") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          temperature: {
            ...pre?.thresholds.temperature,
            green: Number(e.target.value),
          },
        },
      }));
    } else if (threshold === "temperature" && metric === "yellow") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          temperature: {
            ...pre?.thresholds.temperature,
            yellow: Number(e.target.value),
          },
        },
      }));
    }
  };

  // function to handle change of configuration notification fields
  const handleChangeNotificationConfiguration = (channel: number) => {
    setModifiedConfiguration((pre) => ({
      ...pre,
      thresholds: pre?.thresholds as thresholdType,
      notifications: {
        ...(pre?.notifications as notificationType),
        channels: [
          {
            name: modifiedConfiguration?.notifications?.channels[0]?.name,
            enable:
              channel === 0
                ? modifiedConfiguration?.notifications.channels[0].enable ===
                  true
                  ? false
                  : true
                : modifiedConfiguration?.notifications.channels[0].enable,
          },
          {
            name: modifiedConfiguration?.notifications?.channels[1]?.name,
            enable:
              channel === 1
                ? modifiedConfiguration?.notifications.channels[1].enable ===
                  true
                  ? false
                  : true
                : modifiedConfiguration?.notifications.channels[1].enable,
          },
          {
            name: modifiedConfiguration?.notifications?.channels[2]?.name,
            enable:
              channel === 2
                ? modifiedConfiguration?.notifications.channels[2].enable ===
                  true
                  ? false
                  : true
                : modifiedConfiguration?.notifications.channels[2].enable,
          },
        ],
      } as notificationType,
    }));
  };

  const handleActionButtonStates = (modified: configurationDetailsType) => {
    if (
      parseInt(`${modified?.thresholds?.temperature?.green}`) !==
        parseInt(`${configurationDetails?.thresholds.temperature?.green}`) ||
      parseInt(`${modified?.thresholds?.temperature?.yellow}`) !==
        parseInt(`${configurationDetails?.thresholds.temperature?.yellow}`) ||
      parseFloat(`${modified?.thresholds?.vibration?.green}`) !==
        parseFloat(`${configurationDetails?.thresholds.vibration?.green}`) ||
      parseFloat(`${modified?.thresholds?.vibration?.yellow}`) !==
        parseFloat(`${configurationDetails?.thresholds.vibration?.yellow}`) ||
      parseFloat(`${modified?.thresholds?.noise?.green}`) !==
        parseFloat(`${configurationDetails?.thresholds.noise?.green}`) ||
      parseFloat(`${modified?.thresholds?.noise?.yellow}`) !==
        parseFloat(`${configurationDetails?.thresholds.noise?.yellow}`) ||
      modified?.notifications?.channels[0].enable !==
        configurationDetails?.notifications?.channels[0].enable ||
      modified?.notifications?.channels[1].enable !==
        configurationDetails?.notifications?.channels[1].enable ||
      modified?.notifications?.channels[2].enable !==
        configurationDetails?.notifications?.channels[2].enable
    ) {
      setIsActionButtonActive(true);
    } else {
      setIsActionButtonActive(false);
    }
  };

  // function to set configuration details
  useEffect(() => {
    if (clearConfiguration === true) {
      fetchConfigurationDetails();
    }
  }, [clearConfiguration]);

  useEffect(() => {
    handleActionButtonStates(modifiedConfiguration as configurationDetailsType);
  }, [modifiedConfiguration]);

  return (
    <Box padding="1rem" sx={smartPredictionStyles.settingsTab}>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: `0.05rem solid ${styles.lightGrayColor}` }}
        >
          <Typography fontWeight="bold">Thresholds</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <>
              <Grid container>
                <Grid item md={12} marginY="0.5rem">
                  <Typography fontWeight="600">Vibration</Typography>
                </Grid>
                <Grid item md={3}>
                  <label>Good :</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
                  <input
                    type="number"
                    max="1"
                    min="1"
                    style={smartPredictionStyles.configurationInput}
                    onChange={(e) =>
                      handleChangeThresholdConfiguration(
                        e,
                        "vibration",
                        "green",
                      )
                    }
                    value={parseFloat(
                      `${modifiedConfiguration?.thresholds.vibration?.green}`,
                    )}
                  />{" "}
                </Grid>
                <Grid item md={3}>
                  <label>Average :</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    max="1"
                    min="1"
                    style={smartPredictionStyles.configurationInput}
                    onChange={(e) =>
                      handleChangeThresholdConfiguration(
                        e,
                        "vibration",
                        "yellow",
                      )
                    }
                    value={parseFloat(
                      `${modifiedConfiguration?.thresholds.vibration?.yellow}`,
                    )}
                  />{" "}
                  units
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12} marginY="0.5rem">
                  <Typography fontWeight="600">Noise</Typography>
                </Grid>
                <Grid item md={3}>
                  <label>Good :</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    max="1"
                    min="1"
                    style={smartPredictionStyles.configurationInput}
                    onChange={(e) =>
                      handleChangeThresholdConfiguration(e, "noise", "green")
                    }
                    value={parseFloat(
                      `${modifiedConfiguration?.thresholds.noise?.green}`,
                    )}
                  />{" "}
                  units
                </Grid>
                <Grid item md={3}>
                  <label>Average :</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    max="1"
                    min="1"
                    style={smartPredictionStyles.configurationInput}
                    onChange={(e) =>
                      handleChangeThresholdConfiguration(e, "noise", "yellow")
                    }
                    value={parseFloat(
                      `${modifiedConfiguration?.thresholds.noise?.yellow}`,
                    )}
                  />{" "}
                  units
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12} marginY="0.5rem">
                  <Typography fontWeight="600">Temperature</Typography>
                </Grid>
                <Grid item md={3}>
                  <label>Good :</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    max="1"
                    min="1"
                    style={smartPredictionStyles.configurationInput}
                    onChange={(e) =>
                      handleChangeThresholdConfiguration(
                        e,
                        "temperature",
                        "green",
                      )
                    }
                    value={parseFloat(
                      `${modifiedConfiguration?.thresholds.temperature?.green}`,
                    )}
                  />{" "}
                  Celcius
                </Grid>
                <Grid item md={3}>
                  <label>Average :</label>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <input
                    type="number"
                    max="1"
                    min="1"
                    style={smartPredictionStyles.configurationInput}
                    onChange={(e) =>
                      handleChangeThresholdConfiguration(
                        e,
                        "temperature",
                        "yellow",
                      )
                    }
                    value={parseFloat(
                      `${modifiedConfiguration?.thresholds.temperature?.yellow}`,
                    )}
                  />{" "}
                  Celcius
                </Grid>
              </Grid>
            </>
        </AccordionDetails>
      </Accordion>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: `0.05rem solid ${styles.lightGrayColor}` }}
        >
          <Typography fontWeight="bold">Notifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <>
              <Grid container>
                <Grid item md={12}>
                  <Typography fontWeight="600">Channels</Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>
                    SMS
                    <Switch
                      checked={
                        modifiedConfiguration?.notifications.channels[0]?.enable
                      }
                      onChange={() => handleChangeNotificationConfiguration(0)}
                    />
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>
                    Email
                    <Switch
                      checked={
                        modifiedConfiguration?.notifications.channels[1]?.enable
                      }
                      onChange={() => handleChangeNotificationConfiguration(1)}
                    />
                  </Typography>
                </Grid>
                <Grid item md={4}>
                  <Typography>
                    Whatsapp
                    <Switch
                      checked={
                        modifiedConfiguration?.notifications.channels[2]?.enable
                      }
                      onChange={() => handleChangeNotificationConfiguration(2)}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </>
          <Grid
            container
            marginTop="1rem"
            display="flex"
            justifyContent="right"
            gap={2}
          >
            <Button
              onClick={() => applyConfigurationDetails()}
              disabled={isActionButtonActive === false}
              sx={
                isActionButtonActive === false
                  ? {
                      backgroundColor: styles.lightGrayColor,
                      color: styles.whiteColor,
                    }
                  : { backgroundColor: styles.primaryColor }
              }
            >
              Save
            </Button>
            <Button
              onClick={() => setClearConfiguration(true)}
              disabled={isActionButtonActive === false}
              sx={
                isActionButtonActive === false
                  ? {
                      backgroundColor: styles.lightGrayColor,
                      color: styles.whiteColor,
                    }
                  : { backgroundColor: styles.primaryColor }
              }
            >
              Clear
            </Button>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Settings;

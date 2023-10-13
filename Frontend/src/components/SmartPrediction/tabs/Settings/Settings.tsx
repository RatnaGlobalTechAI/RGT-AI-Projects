/* eslint-disable no-nested-ternary */
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import styles from "../../../../sass/styles.module.scss";
import { smartPredictionStyles } from "components/SmartPrediction/SmartPrediction.styles";
import {
  getConfigurationDetails,
  getDeviceNames,
  setConfigurationDetails,
} from "service/monitorService";
import { ChangeEvent, useEffect, useState } from "react";
import {
  configurationDetailsType,
  configurationResponseType,
  notificationType,
  thresholdType,
} from "types/Monitoring.types";

const Settings = () => {
  const [configurationDetails, setconfigurationDetails] =
    useState<configurationDetailsType>();
  const [modifiedConfiguration, setModifiedConfiguration] =
    useState<configurationDetailsType>({
      notifications : {channels:[
        {
      name : "sms",
      enable : false
      },
      {
      name : "email",
      enable : false
      },
      {
      name : "whatsapp",
      enable : false
      }
      ],enable:false},
      thresholds : {}
    });
  const [isActionButtonActive, setIsActionButtonActive] =
    useState<boolean>(false);
  const [deviceNames, setDeviceNames] = useState<string[]>();
  const [deviceName,setDeviceName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDeviceSelect = (event: SelectChangeEvent) => {
    setDeviceName(event.target.value as string);
  };

  // function to fetch device names
  const fetchDeviceNames = async () => {
    const response : {name : string}[] = await getDeviceNames();
    const names : string[] = [];
    response?.forEach((device)=>{
      names.push(device?.name);
    });
    setDeviceNames(names);
    setDeviceName(names[0]);
  };

  // function to fetch configuration details
  const fetchConfigurationDetails = async () => {
    if(deviceName){
      setIsLoading(true);
      const response : configurationResponseType = await getConfigurationDetails(deviceName as string);
      //eslint-disable-next-line
      console.log(response)
      if (response) {
        setconfigurationDetails({
          thresholds : response?.deviceThresholds?.[0]?.thresholds,
          notifications : response?.notifications
        });
        setModifiedConfiguration({
          thresholds : response?.deviceThresholds?.[0]?.thresholds,
          notifications : response?.notifications
        });
        setIsActionButtonActive(false);
      }
      setIsLoading(false);
    }
  };

  // function to set configuration details
  const applyConfigurationDetails = async () => {
    const configurationDetailsBody : configurationResponseType = {
      deviceThresholds : [
        {
          device : deviceName as string,
          thresholds : modifiedConfiguration?.thresholds as thresholdType
        }
      ],
      notifications : modifiedConfiguration?.notifications as notificationType
    };
    const response = await setConfigurationDetails(
      configurationDetailsBody as configurationResponseType,
    );
    if (response) {
      setIsActionButtonActive(false);
    }
  };

  //function to handle change in threshold fields
  const handleChangeThresholdConfiguration = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
            green: e.target.value,
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
            yellow: e.target.value,
          },
        },
      }));
    } else if (threshold === "noise" && metric === "green") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          noise: { ...pre?.thresholds.noise, green: e.target.value },
        },
      }));
    } else if (threshold === "noise" && metric === "yellow") {
      setModifiedConfiguration((pre) => ({
        ...pre,
        notifications: { ...(pre?.notifications as notificationType) },
        thresholds: {
          ...pre?.thresholds,
          noise: { ...pre?.thresholds.noise, yellow: e.target.value },
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
            green: e.target.value,
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
            yellow: e.target.value,
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
      `${modified?.thresholds?.temperature?.green}` !==
        `${configurationDetails?.thresholds.temperature?.green}` ||
      `${modified?.thresholds?.temperature?.yellow}` !==
        `${configurationDetails?.thresholds.temperature?.yellow}` ||
      `${modified?.thresholds?.vibration?.green}` !==
        `${configurationDetails?.thresholds.vibration?.green}` ||
      `${modified?.thresholds?.vibration?.yellow}` !==
        `${configurationDetails?.thresholds.vibration?.yellow}` ||
      `${modified?.thresholds?.noise?.green}` !==
        `${configurationDetails?.thresholds.noise?.green}` ||
      `${modified?.thresholds?.noise?.yellow}` !==
        `${configurationDetails?.thresholds.noise?.yellow}` ||
      modified?.notifications?.channels[0]?.enable !==
        configurationDetails?.notifications?.channels[0]?.enable ||
      modified?.notifications?.channels[1]?.enable !==
        configurationDetails?.notifications?.channels[1]?.enable ||
      modified?.notifications?.channels[2]?.enable !==
        configurationDetails?.notifications?.channels[2]?.enable
    ) {
      setIsActionButtonActive(true);
    } else {
      setIsActionButtonActive(false);
    }
  };

  // function to set configuration details
  useEffect(() => {
      fetchConfigurationDetails();
  }, [deviceName]);

  useEffect(() => {
    handleActionButtonStates(modifiedConfiguration as configurationDetailsType);
  }, [modifiedConfiguration]);

  useEffect(()=>{
    fetchDeviceNames();
  },[]);

  return (
    <Box padding="1rem" sx={smartPredictionStyles.settingsTab}>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: `0.05rem solid ${styles.lightGrayColor}` }}
        >
          <Typography fontWeight="bold">Thresholds</Typography>
        </AccordionSummary>
        {
          isLoading ? 
          (<>Loading...</>)
          :
          (
            <AccordionDetails>
                <>
                  <Grid container>
                    <Grid item md={12} xs={12} gap={5} sx={smartPredictionStyles.monitorFormsSection}>
                          <FormControl >
                            <FormLabel>Device</FormLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              onChange={handleDeviceSelect}
                              value={deviceName}
                            >
                              {
                                deviceNames?.map((name,index)=>(
                                    <MenuItem key={index} value={name}>{name}</MenuItem>
                                ))
                              }
                              </Select>
                          </FormControl>
                    </Grid>
                    <Grid item md={12} marginY="0.5rem">
                      <Typography fontWeight="600">Vibration</Typography>
                    </Grid>
                    <Grid item md={3}>
                      <label>Good :</label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
                      <TextField
                      variant="standard"
                        style={smartPredictionStyles.configurationInput}
                        onChange={(e) =>
                          handleChangeThresholdConfiguration(
                            e,
                            "vibration",
                            "green",
                          )
                        }
                        value={`${modifiedConfiguration?.thresholds?.vibration?.green}`}
                      />{" "}
                      {modifiedConfiguration?.thresholds?.vibration?.unit}
                    </Grid>
                    <Grid item md={3}>
                      <label>Average :</label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <TextField
                      variant="standard"
                        style={smartPredictionStyles.configurationInput}
                        onChange={(e) =>
                          handleChangeThresholdConfiguration(
                            e,
                            "vibration",
                            "yellow",
                          )
                        }
                        value={`${modifiedConfiguration?.thresholds?.vibration?.yellow}`}
                      />{" "}
                      {modifiedConfiguration?.thresholds?.vibration?.unit}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={12} marginY="0.5rem">
                      <Typography fontWeight="600">Noise</Typography>
                    </Grid>
                    <Grid item md={3}>
                      <label>Good :</label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <TextField
                      variant="standard"
                        style={smartPredictionStyles.configurationInput}
                        onChange={(e) =>
                          handleChangeThresholdConfiguration(e, "noise", "green")
                        }
                        value={`${modifiedConfiguration?.thresholds?.noise?.green}`}
                      />{" "}
                      {modifiedConfiguration?.thresholds?.noise?.unit}
                    </Grid>
                    <Grid item md={3}>
                      <label>Average :</label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <TextField
                      variant="standard"
                        style={smartPredictionStyles.configurationInput}
                        onChange={(e) =>
                          handleChangeThresholdConfiguration(e, "noise", "yellow")
                        }
                        value={`${modifiedConfiguration?.thresholds?.noise?.yellow}`}
                      />{" "}
                      {modifiedConfiguration?.thresholds?.noise?.unit}
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item md={12} marginY="0.5rem">
                      <Typography fontWeight="600">Temperature</Typography>
                    </Grid>
                    <Grid item md={3}>
                      <label>Good :</label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <TextField
                      variant="standard"
                        style={smartPredictionStyles.configurationInput}
                        onChange={(e) =>
                          handleChangeThresholdConfiguration(
                            e,
                            "temperature",
                            "green",
                          )
                        }
                        value={`${modifiedConfiguration?.thresholds?.temperature?.green}`}
                      />{" "}
                      {modifiedConfiguration?.thresholds?.temperature?.unit}
                    </Grid>
                    <Grid item md={3}>
                      <label>Average :</label>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <TextField
                      variant="standard"
                        style={smartPredictionStyles.configurationInput}
                        onChange={(e) =>
                          handleChangeThresholdConfiguration(
                            e,
                            "temperature",
                            "yellow",
                          )
                        }
                        value={`${modifiedConfiguration?.thresholds?.temperature?.yellow}`}
                      />{" "}
                      {modifiedConfiguration?.thresholds?.temperature?.unit}
                    </Grid>
                  </Grid>
                </>
            </AccordionDetails>
            )
        }
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
                        modifiedConfiguration?.notifications?.channels?.[0]?.enable
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
                        modifiedConfiguration?.notifications?.channels?.[1]?.enable
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
                        modifiedConfiguration?.notifications?.channels?.[2]?.enable
                      }
                      onChange={() => handleChangeNotificationConfiguration(2)}
                    />
                  </Typography>
                </Grid>
              </Grid>
            </>
        </AccordionDetails>
      </Accordion>
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
              onClick={() => setModifiedConfiguration(configurationDetails as configurationDetailsType)}
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
              Cancel
            </Button>
          </Grid>
    </Box>
  );
};

export default Settings;

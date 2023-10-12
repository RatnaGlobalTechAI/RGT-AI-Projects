import { Box } from "@mui/material";
import { TabPanelProps } from "types/Monitoring.types";
import styles from "../../sass/styles.module.scss";

export const getLast5MinutesTimes = () => {
  const currentTime = new Date(); // Current time
  const times = [];

  for (let i = 10; i >= 0; i--) {
    const minuteAgo = new Date(currentTime.getTime() - i * 60 * 1000); // Calculate time i minutes ago
    const hours = minuteAgo.getHours().toString().padStart(2, "0");
    const minutes = minuteAgo.getMinutes().toString().padStart(2, "0");
    const timeString = `${hours}:${minutes}`;
    times.push(timeString);
  }

  return times;
};

export const getLast5MinutesTimeStamp = () => {
  const timestamps = [];
  const currentTime = new Date(); // Current time in milliseconds

  for (let i = 10; i >= 0; i--) {
    const minuteAgo = new Date(currentTime.getTime() - i * 60 * 1000); // Calculate time i minutes ago
    const times = minuteAgo.getTime();
    timestamps.push(times);
  }
  return timestamps;
};

export const getTimeStamp = () => {
  const currentTime = new Date(); // Current time in milliseconds
  const minuteAgo = new Date(currentTime.getTime()); // Calculate time i minutes ago
  const timeStamp = minuteAgo.getTime();
  return timeStamp;
};

export const getCurrentTime = () => {
  const currentTime = new Date(); // Current time
  const minuteAgo = new Date(currentTime.getTime()); // Calculate time i minutes ago
  const hours = minuteAgo.getHours().toString().padStart(2, "0");
  const minutes = minuteAgo.getMinutes().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  return timeString;
};

export const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});

///tabs panel which will render the content of tabs
export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      style={{ height: "80%"}}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

export const statusColor = (status : string) => {
  if(status){
    if (status==="green") {
      return `${styles.successMainColor}`;
    } else if (status==="yellow") {
      return `${styles.darkYellowColor}`;
    } else {
      return `${styles.errorMainColor}`;
    }
  }
  return "";
};

export const convertISOtoTime = (isoString: string) => {
  const hours = new Date(isoString).getHours();
  const minutes = String(new Date(isoString).getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const getPreviousMinuteFromISO = (isoString: string) => {
  const previousMinute = new Date(
    new Date(isoString).getTime() - 1 * 60 * 1000,
  );
  const hours = previousMinute.getHours();
  const minutes = previousMinute.getMinutes();
  return `${hours}:${minutes}`;
};

export const getPreviousTimeStamps = (limit: number) => {
  const currentDate = new Date();

  const lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1,
  ); // First day of last month
  const firstTimestamp = lastMonth.getTime(); // Timestamp for the first moment of last month

  const currentMonthFirstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ); // First day of current month
  const lastTimestamp = currentMonthFirstDay.getTime() - 1; // Subtract 1 millisecond to get the last moment of last month

  // Create an array to store the dates of the last 7 days
  const previousDates = [];
  const previousDatesTimeStamp = [];

  // Loop through the last 7 days and add them to the array
  for (let i = 0; i < limit; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const formattedDate = date.toISOString().split("T")[0];
    previousDates.push(formattedDate);
  }

  for (let i = 0; i < previousDates.length; i++) {
    const timeStamp = Date.parse(previousDates[i]);
    previousDatesTimeStamp.push(timeStamp);
  }

  return {
    dates: previousDates,
    timeStamps: previousDatesTimeStamp,
    firstTimestamp,
    lastTimestamp,
  };
};

export const getDatesBetween = (startDate: Date, endDate: Date) => {
  const dates = [];
  const previousDatesTimeStamp = [];

  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  for (let i = 0; i < dates.length; i++) {
    const timeStamp = Date.parse(dates[i]) / 1000;
    previousDatesTimeStamp.push(timeStamp);
  }

  return {
    dates: dates,
    timeStamps: previousDatesTimeStamp,
  };
};

export const decimalFinder = (number: number) => number !== Math.floor(number);

export const deviceHistoryColumns = [
  {
    field: "id",
    headerName: "S.no",
    width: 150,
  },
  {
    field: "time",
    headerName: "Time",
    width: 150,
  },
  {
    field: "value",
    headerName: "Value",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
];

export const deviceNotificationColumns = [
  {
    field: "id",
    headerName: "S.no",
    width: 150,
  },
  {
    field: "time",
    headerName: "Time",
    width: 150,
  },
  {
    field: "message",
    headerName: "Message",
    width: 150,
  },
  {
    field: "select",
    headerName: "Select",
    width: 150,
  },
];

export type TabPanelProps = {
  children?: React.ElementRef<>;
  index: number;
  value: number;
};

export interface chartProps {
  deviceName: string;
}

export interface paginationType {
  page: number;
  pageSize: number;
}

export interface thresholdType {
  vibration?: {
    red?: string;
    yellow?: string;
    green?: string;
    unit? : string
  };
  noise?: {
    red?: string;
    yellow?: string;
    green?: string;
    unit? : string
  };
  temperature?: {
    red?: string;
    yellow?: string;
    green?: string;
    unit? : string
  };
}
export interface telemetryDataPointsType {
  temperature: number;
  vibration: number;
  noise: number;
  date: number;
}

export interface deviceDataType {
  temperature: number;
  vibration: number;
  noise: number;
  date: string;
  status : string
}

export type MonitorDataType = {
  temperature: number;
  vibration: number;
  noise: number;
  currentValue?: number;
  peakValue?: number | undefined;
  averageValue?: number | undefined;
  goodValue: number | undefined;
  value?: number;
  time?: string;
}[];

export interface noiseDataType {
  green: string;
  yellow: string;
  red: string;
}

export interface vibrationDataType {
  green?: number;
  yellow?: number;
  red?: number;
}

export interface temperatureDataType {
  green: string;
  yellow: string;
  red: string;
}

export interface realTimeDataType {
  goodValue?: number;
  averageValue?: number;
  peakValue?: number;
  xAxis?: string;
  presentValue?: number;
}

export interface HistoryTabProps {
  dateRange?: string;
  startDate?: string;
  endDate?: string;
  customDateRange?: dateRangeType;
  deviceName: string;
  deviceHistoryRows: deviceHistoryType[];
  setRecordsRange: Dispatch<SetStateAction<recordsRangeType | undefined>>;
  recordsRange: recordsRangeType;
  totalCount: number;
  pageSize: number;
  setDeviceHistoryRows: Dispatch<SetStateAction<deviceHistoryType | undefined>>;
}

export interface dateRangeType {
  startDate?: Date;
  endDate?: Date;
}

export interface dateRangeProps {
  open: boolean;
  handleClose: () => void;
  setDataRange?: Dispatch<SetStateAction<recordsRangeType | undefined>>;
  setPreviousDates: Dispatch<SetStateAction<dateRangeType | undefined>>;
  setRows?: Dispatch<SetStateAction<deviceHistoryType | undefined>>;
  setPaginationModel: Dispatch<SetStateAction<undefined>>;
}

export interface betweenDatesType {
  dates: string[];
  timeStamps: number[];
  lastTimestamp: number;
  firstTimestamp: number;
}

export interface deviceHistoryType {
  id: number;
  time: string;
  value: string;
  status: string;
  key: string;
}

export interface deviceHistoriesType {
  name: string;
  telemetryDataPoints: {
    date: string;
    noise: string;
    status: string;
    temperature: string;
    vibration: string;
    id: string;
  }[];
}

export interface historyTableRow {
  id: number;
  time: string;
  value: string;
  status: string;
}

export interface historyTableProps {
  setRecordsRange: Dispatch<SetStateAction<recordsRangeType | undefined>>;
  recordsRange: recordsRangeType;
  totalCount: number;
  deviceHistoryRows: deviceHistoryType[];
  rowsPerPage: number;
  pageNumber: number;
  setRowsPerPage: Dispatch<SetStateAction<number | undefined>>;
}

export interface recordsRangeType {
  start: number;
  end: number;
}

export interface monitoringChartProps {
  chartData : realTimeDataType[],
  status : string
}

export interface vibrationHistoryProps {
  deviceName: string;
  previousDates: Dispatch<SetStateAction<betweenDatesType | undefined>>;
  isLoading: boolean;
  deviceHistoryRows: deviceHistoryType[];
  totalCount: number;
  handlePagination: (event: GridPaginationModel) => void;
  paginationModel: Partial<GridPaginationModel>;
  tableName: string;
}

export interface historyChartProps {
  chartData: deviceHistoryType[];
  deviceThreshold: thresholdType;
  metric: string;
}

export interface chartVertexType {
  peakValue: number;
  averageValue: number;
  goodValue: number;
  presentValue: number;
  time: string;
}

export interface deviceNotificationType {
  id: string;
  date: string;
  message: string;
  acknowledge: boolean;
  clear: boolean;
  key: string;
}

export interface notificationTableProps {
  handlePagination: (event: GridPaginationModel) => void;
  deviceNotificationRows: deviceNotificationType[];
  totalCount: number;
  paginationModel: {
    page: number;
    pageSize: number;
  };
  isLoading: boolean;
  acknowledgeNotification: (id: GridRowSelectionModel) => Promise<void>;
}

export interface notificationType {
  enable: boolean;
  channels: 
    {
      name: string;
      enable: boolean;
    }[],
}

export interface configurationResponseType {
  deviceThresholds : {
    device : string
    thresholds : thresholdType
  }[],
  notifications : notificationType
}

export interface configurationDetailsType {
  notifications: notificationType;
  thresholds: thresholdType;
}

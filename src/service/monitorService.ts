/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorHandler } from "genericComponents/toaster/toaster";
import { apiWrapper } from "./apiWrapper.service";
import { configurationDetailsType } from "types/Monitoring.types";

// api service to get device names
export const getDeviceNames = async () => {
  try {
    const response = await apiWrapper.get(`/deviceReader/devices`);
    if(response?.data){
      return response?.data;
    }
  }catch(err: any){
    errorHandler(err?.response?.data?.message);
  }
};

// api service to get device threshold
export const getDeviceThreshold = async (deviceName: string) => {
  try {
    const response = await apiWrapper.get(
      `/deviceReader/devices/${deviceName}/threshold`,
    );
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

// api service to get device data
export const getDeviceData = async (deviceName: string) => {
  try {
    const response = await apiWrapper.get(
      `/deviceReader/devices/${deviceName}`,
    );
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

// api service to get device history
export const getDeviceHistory = async (
  deviceName: string,
  startTime: number,
  endTime: number,
  startRecord: number,
  endRecord: number,
  param : string
) => {
  try {
    const response = await apiWrapper.get(
      `/deviceReader/devices/${deviceName}/${param}/history/starttime/${startTime}/endtime/${endTime}/recordstart/${startRecord}/recordend/${endRecord}`,
    );
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

// api service to get device notifications
export const getDeviceNotifications = async (
  deviceName: string,
  startTime: number,
  endTime: number,
  startRecord: number,
  endRecord: number,
) => {
  try {
    const response = await apiWrapper.get(
      `/deviceReader/devices/${deviceName}/notifications/starttime/${startTime}/endtime/${endTime}/recordstart/${startRecord}/recordend/${endRecord}`,
    );
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

// api service to acknowledge device notifications
export const acknowledgeDeviceNotification = async (
  deviceName: string,
  ids: string[],
) : Promise<void | string> => {
  try {
    const response = await apiWrapper.post(
      `/deviceReader/devices/${deviceName}/notifications/ack`,
      { idList: ids },
    );
    if (response?.status === 200) {
      return "Acknowledged successfully !!";
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

// api service for device  notification settings
export const getConfigurationDetails = async () => {
  try {
    const response = await apiWrapper.get("/deviceReader/settings");
    if (response?.data) {
      return response?.data;
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

// api service for device  notification settings
export const setConfigurationDetails = async (
  configurationDetails: configurationDetailsType,
): Promise<void | string> => {
  try {
    const response = await apiWrapper.post(
      "/deviceReader/settings",
      configurationDetails,
    );
    if (response?.status === 200) {
      return "Success";
    }
  } catch (err: any) {
    errorHandler(err?.response?.data?.message);
  }
};

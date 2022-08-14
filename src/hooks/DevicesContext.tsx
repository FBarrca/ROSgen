import React, { createContext } from "react";
import { DeviceProps } from "../interfaces/MainCanvas";

type DeviceContextType = {
  devices: {
    selected: number;
    list: DeviceProps[];
  };
  setDevices: React.Dispatch<
    React.SetStateAction<{
      selected: number;
      list: DeviceProps[];
    }>
  >;
};

const iDeviceContext: { devices: any; setDevices: any } = {
  //type of drawerstate
  devices: {
    selected: 0,
    list: [],
  },
  setDevices: () => {},
};

const DevicesContext = createContext<DeviceContextType>(iDeviceContext);

export default DevicesContext;

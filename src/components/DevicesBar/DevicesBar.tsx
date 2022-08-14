import React, { FC, useEffect, useState, useContext } from "react";
import { Button, Card, List } from "antd";
import "../../App.less";
import DeviceButton from "./DeviceButton";
import colorPallete from "../../constants/colorPallete.json";
import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
  DesktopOutlined,
  MobileOutlined,
  MobileFilled,
} from "@ant-design/icons";
import DevicesContext from "../../hooks/DevicesContext";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
const DevicesBar: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<number>(0);

  const [mode, setMode] = useState<"none" | "edit" | "delete">("none");
  // const [devices, setDevices] = useState([
  //   {
  //     name: "Device 1",
  //     id: 0,
  //     color: colorPallete[0],
  //   },
  // ]);
  const { devices, setDevices } = useContext(DevicesContext);

  const newColor = (id: number) => {
    //picks the color corresponding to the id if the id is bigger cycle through the colors
    const color = colorPallete[id % colorPallete.length];
    return color;
  };
  useEffect(() => {
    console.log("devices", devices);
    console.log("visible", visible);
  }, [devices]);

  const addDevice = () => {
    setDevices({
      ...devices,
      list: [
        ...devices.list,
        {
          name: "New Device",
          id: devices.list[devices.list.length - 1].id + 1,
          color: newColor(devices.list[devices.list.length - 1].id + 1),
        },
      ],
    });
  };
  const removeDevice = (id: number) => {
    console.log("removeDevice", id);
    setDevices({ selected: devices.selected, list: devices.list.filter((device) => device.id !== id) });
    setMode("none");
  };
  const editDevice = (id: number, name: string) => {
    setDevices({
      selected: devices.selected,
      list: devices.list.map((device) => (device.id === id ? { ...device, name } : device)),
    });
    setMode("none");
  };
  return (
    <div className={"devices-bar"}>
      {/* {visible ? ( */}

      <Card
        className={"devices-card"}
        title={
          <>
            {
              <Button
                icon={<LeftOutlined />}
                shape="circle"
                onClick={() => setVisible((prev) => !prev)}
                style={{
                  marginLeft: "-60px",
                  borderColor: "transparent",
                  transition: "all 0.1s ease-in-out",
                  transform: visible ? "rotate(-180deg)" : "rotate(0deg)",
                }}
              />
            }
            <DevicesIcon />
            Devices
          </>
        }
        headStyle={{
          backgroundColor: "white",
          padding: "0",
        }}
        bodyStyle={{
          margin: "0",
          padding: "0",
        }}
        style={{
          transition: "all 0.3s ease-in-out",
          transform: visible ? "translateX(0)" : "translateX(80%)",
        }}
        actions={
          visible
            ? [
                <PlusOutlined
                  key="setting"
                  onClick={() => {
                    setMode("none");
                    addDevice();
                  }}
                />,
                <EditOutlined key="edit" onClick={() => setMode("edit")} />,
                <DeleteOutlined key="delete" onClick={() => setMode("delete")} />,
              ]
            : []
        }
      >
        <div style={{ transition: "all 0.4s ease-in-out", transform: visible ? "translateX(0)" : "translateX(100%)" }}>
          {visible && (
            <List
              size="small"
              dataSource={devices.list}
              style={{
                maxHeight: "200px",
                overflowY: "auto",
              }}
              renderItem={(item) => (
                <DeviceButton
                  key={item.id}
                  color={item.color}
                  name={item.name}
                  id={item.id}
                  onChange={(color) => {
                    console.log(color);
                    item.color = color;
                    setDevices({
                      ...devices,
                    });
                  }}
                  onClick={() => {
                    setSelectedDevice(item.id);
                    setDevices({
                      ...devices,
                      selected: item.id,
                    });
                  }}
                  selected={item.id === selectedDevice}
                  onClickDelete={(e: any, id: number) => removeDevice(id)}
                  onClickEdit={(newName: string) => editDevice(item.id, newName)}
                  mode={mode}
                />
              )}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default DevicesBar;

const DevicesIcon: FC = () => {
  return (
    <>
      {/* <MobileFilled
        style={{
          position: "relative",
          top: "5px",
          left: "-5px",
        }}
      />
      <DesktopOutlined
        style={{
          fontSize: "1.5rem",
          position: "relative",
          left: "-15px",
        }}
      /> */}
      <DesktopOutlined
        style={{
          fontSize: "1.5rem",
          position: "relative",
          top: "3px",
          marginRight: "8px",
        }}
      />
    </>
  );
};

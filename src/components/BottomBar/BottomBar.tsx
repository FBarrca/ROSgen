import React from "react";
import { Button } from "antd";
import "../../App.less";
import ScaleButton from "./ScaleButton";

import { BorderlessTableOutlined } from "@ant-design/icons";
import CodeGenerator from "../ExportCode/main";
import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";
import DevicesContext from "../../hooks/DevicesContext";

interface optionProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  toggle: boolean;
}
const options: optionProps[] = [
  {
    label: "Allign",
    value: "allign",
    icon: <BorderlessTableOutlined />,
    toggle: false,
  },
];

// BottomBar component is used to display buttons at the bottom right of the screen
const BottomBar: React.FC = () => {
  const { nodes, setNodes } = React.useContext(NodesContext);
  const { topics, setTopics } = React.useContext(TopicsContext);
  const { devices, setDevices } = React.useContext(DevicesContext);
  return (
    <>
      {/* <div className={"bottom-nav bottom-center"} style={{ justifyContent: "center" }}>
        <ScaleButton className={"bottom-button"} />
      </div> */}
      <div className={"bottom-nav"} style={{ right: 0 }}>
        {options.map((option) => (
          <Button
            className={"bottom-button"}
            key={option.value}
            onClick={() => {
              // CodeGenerator(nodes, topics, devices.list);
            }}
          >
            {option.label}{" "}
          </Button>
        ))}
        <ScaleButton className={"bottom-button"} />
      </div>
    </>
  );
};
export default BottomBar;

import React, { FC, useContext, useEffect } from "react";
import { Card } from "antd";
import "../../App.less";
import SidebarButton from "./SidebarButton";
import ToolContext from "../../hooks/ToolContext";

import {
  InfoCircleOutlined,
  NodeIndexOutlined,
  ExportOutlined,
  BorderlessTableOutlined,
  EllipsisOutlined,
  FolderAddTwoTone,
  FileAddTwoTone,
  PlusCircleTwoTone,
  PlusSquareTwoTone,
} from "@ant-design/icons";
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
  {
    label: "Information Drawer",
    value: "drawer",
    icon: <InfoCircleOutlined />,
    toggle: true,
  },
  {
    label: "Add Comment",
    value: "comment",
    icon: <FileAddTwoTone />,
    toggle: true,
  },
  {
    label: "Connections",
    value: "connect",
    icon: <NodeIndexOutlined />,
    toggle: true,
  },
  {
    label: "Add Node",
    value: "node",
    icon: <PlusCircleTwoTone />,
    toggle: true,
  },
  {
    label: "Add Topic",
    value: "topic",
    icon: <PlusSquareTwoTone />,
    toggle: true,
  },
  {
    label: "Add Service",
    value: "service",
    icon: <FolderAddTwoTone />,
    toggle: true,
  },
  {
    label: "Export",
    value: "export",
    icon: <ExportOutlined />,
    toggle: false,
  },
  {
    label: "Other options",
    value: "other",
    icon: <EllipsisOutlined style={{ fontSize: "16px", color: "#08c" }} />,
    toggle: false,
  },
];

const Sidebar: FC = () => {
  const { selectedTool, setSelectedTool } = useContext(ToolContext);

    const { nodes, setNodes } = React.useContext(NodesContext);
  const { topics, setTopics } = React.useContext(TopicsContext);
  const { devices, setDevices } = React.useContext(DevicesContext);
  useEffect(() => { 
    if (selectedTool === "export") {
      CodeGenerator(nodes, topics,devices.list)
      setSelectedTool("");
  }
  }, [selectedTool]);

  return (
    <Card
      style={{
        margin: "20px",
        borderRadius: "20px",
        backgroundColor: "#f7f7f8",
        overflow: "hidden",
        boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
        //vertical align center
        verticalAlign: "center",
      }}
      bodyStyle={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "0px", paddingBottom: "10px" }}
    >
      {options.map((option) => (
        <SidebarButton
          key={option.value}
          icon={option.icon}
          onClick={setSelectedTool}
          label={option.label}
          option={option.value}
          selected={option.toggle && selectedTool === option.value}
        />
      ))}
    </Card>
  );
};
export default Sidebar;

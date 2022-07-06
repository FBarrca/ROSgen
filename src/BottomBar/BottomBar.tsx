import React, { FC, useEffect, useContext } from "react";
import { Card, Button } from "antd";
import "../App.less";
import SidebarButton from "./BottomButton";
import ScaleButton from "./ScaleButton";

import { EnterOutlined, ExportOutlined, BorderlessTableOutlined, EllipsisOutlined, FolderAddTwoTone, FileAddTwoTone, DragOutlined, PlusCircleTwoTone, PlusSquareTwoTone } from "@ant-design/icons";

interface optionProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  toggle: boolean;
}
const options: optionProps[] = [
  // {
  //   label: "Select",
  //   value: "select",
  //   icon: <DragOutlined />, style={{transform: [{rotateY: '180deg'}]}}/>
  //   toggle: true,
  // },

  {
    label: "Allign",
    value: "allign",
    icon: <BorderlessTableOutlined />,
    toggle: false,
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
    icon: <EnterOutlined />,
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

const BottomBar: React.FC = () => {
  return (
    <div className={"bottom-nav"}>
      {options.map((option) => (
        <Button className={"bottom-button"}>{option.label} </Button>
      ))}
      <ScaleButton className={"bottom-button"} />
    </div>
  );
};
export default BottomBar;

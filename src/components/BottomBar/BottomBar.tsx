import React from "react";
import { Button } from "antd";
import "../../App.less";
import ScaleButton from "./ScaleButton";

import { BorderlessTableOutlined } from "@ant-design/icons";

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
  return (
    <div className={"bottom-nav"}>
      {options.map((option) => (
        <Button className={"bottom-button"} key={option.value}>
          {option.label}{" "}
        </Button>
      ))}
      <ScaleButton className={"bottom-button"} />
    </div>
  );
};
export default BottomBar;
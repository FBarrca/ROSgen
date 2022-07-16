import React from "react";
import { Button, Tooltip } from "antd";
import "../../App.less";

interface SideButtonProps {
  icon: React.ReactNode;
  onClick: React.Dispatch<React.SetStateAction<string | null>>;
  option: string | null;
  label: string;
  selected: boolean;
}
const SidebarButton: React.FC<SideButtonProps> = ({ icon, onClick, option, label, selected }) => (
  <div>
    <Tooltip title={label} placement="right" mouseEnterDelay={1}>
      <Button
        style={{
          borderRadius: "10px",
          marginTop: "10px",
        }}
        onClick={() => {
          onClick(option); //setSidebarOption(option);
        }}
        size="large"
        icon={icon}
        type={selected ? "primary" : "default"}
      />
    </Tooltip>
  </div>
);

export default SidebarButton;

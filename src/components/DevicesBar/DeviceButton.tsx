import React, { useRef, useState, useCallback } from "react";
import { Popover, List, Button, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";

import { HexColorPicker } from "react-colorful";
import useClickOutside from "../../hooks/useClickOutside";
import "../../App.less";
//https://codesandbox.io/s/opmco?file=/src/App.js

const { Text } = Typography;
interface DeviceButtonProps {
  color: string;
  name: string;
  id: number;
  onChange: (color: string) => void;
  mode: "none" | "edit" | "delete";
  selected: boolean;
  onClick: () => void;
  onClickDelete: (e: any, id: number) => void;
  onClickEdit: (newName: string) => void;
}
const DeviceButton: React.FC<DeviceButtonProps> = (props) => {
  const popover: any = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  const content = <HexColorPicker color={props.color} onChange={props.onChange} />;
  return (
    <List.Item
      extra={
        props.mode === "delete" &&
        props.id != 0 && (
          <Button icon={<DeleteOutlined key="delete" />} onClick={(e) => props.onClickDelete(e, props.id)} />
        )
      }
      style={props.selected ? { backgroundColor: "#eaeaea" } : {}}
      onClick={() => props.onClick()}
    >
      <List.Item.Meta
        avatar={
          <div className="picker">
            <Popover content={content} title="Pick a new color" trigger="click" placement="leftTop">
              <div className="swatch" style={{ backgroundColor: props.color }} />
            </Popover>
          </div>
        }
        title={
          <Text editable={props.mode === "edit" ? { onChange: (newText) => props.onClickEdit(newText) } : false}>
            {props.name}
          </Text>
        }
      />
    </List.Item>
  );
};

export default DeviceButton;

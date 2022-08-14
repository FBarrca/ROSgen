import { Typography } from "antd";
import React from "react";

const { Paragraph, Text } = Typography;

interface DrawerItemProps {
  label: string;
  text: string;
  onEditStart?: () => void;
  onChange?: (value: string) => void;
  isEditable: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = (props) => {
  return (
    <>
      <Paragraph>
        <Text strong style={{ fontSize: 20 }}>
          {props.label}
        </Text>
        {"    "}
        <Text
          editable={
            props.isEditable
              ? {
                  onChange: props.onChange,
                  onStart: props.onEditStart,
                }
              : false
          }
        >
          {props.text}
        </Text>
      </Paragraph>
    </>
  );
};
export default DrawerItem;

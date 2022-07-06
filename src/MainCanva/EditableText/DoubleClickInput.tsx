// const { React, ReactDOM } = window

import React from "react";
import { Group } from "react-konva";
import { EditableText } from "./EditableText";

interface iDoubleClickInputProps {
  x: number;
  y: number;
  text: string;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
  isEditing: boolean;
  onToggleEdit: () => void;
}
const DoubleClickInput: React.FC<iDoubleClickInputProps> = (props) => {
  return (
    <Group>
      <EditableText x={props.x} y={props.y} text={props.text} width={250} height={38} isEditing={props.isEditing} onToggleEdit={props.onToggleEdit} onChange={(value: any) => props.onChange(value)} />
    </Group>
  );
};
export default DoubleClickInput;

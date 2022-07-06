// const { React, ReactDOM } = window

import React, { useContext } from "react";
import { Group } from "react-konva";
import CursorPositionContext from "../../context/CursorPositionContext";
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
  const { CursorPostion } = useContext(CursorPositionContext);
  return (
    <Group>
      <EditableText x={props.x} y={props.y} text={props.text} width={100} height={100} isEditing={props.isEditing} onToggleEdit={props.onToggleEdit} onChange={(value: any) => props.onChange(value)} />
    </Group>
  );
};
export default DoubleClickInput;

//Based on https://javascript.plainenglish.io/creating-an-editable-resizable-text-label-in-konva-with-react-8ab3a6b11dfb

import { EditableTextInput } from "./EditableTextInput";
import { Group } from "react-konva";

const RETURN_KEY = 13;
const ESCAPE_KEY = 27;

export function EditableText({
  x,
  y,
  isEditing,
  onToggleEdit,
  onChange,
  text,
  width,
  height
}) {
  function handleEscapeKeys(e) {
    if ((e.keyCode === RETURN_KEY && !e.shiftKey) || e.keyCode === ESCAPE_KEY) {
      onToggleEdit(e);
    }
  }

  function handleTextChange(e) {
    onChange(e.currentTarget.value);
  }

  if (isEditing) {
    return (
      <EditableTextInput
        x={x-5}
        y={y-18}
        width={width}
        height={height}
        value={text}
        onChange={handleTextChange}
        onKeyDown={handleEscapeKeys}
      />
    );
  }
  return (
    <Group/>
  );
}

import React from "react";
import { Ellipse, Text, Group } from "react-konva";
import { NodeProps } from "../../interfaces/MainCanvas";

interface NodeComponentProps {
  node: NodeProps;
  onDragMove: (e: any) => void;
  onClick: (e: any) => void;
  selectedTool: string | null;
  selectedColor: string | null;
}

const Node: React.FC<NodeComponentProps> = (props) => {
  const width = 260;
  const height = 100;

  const newPosition = { x: props.node.position.x, y: props.node.position.y };
  return (
    <Group
      draggable
      id={props.node.id}
      onDragMove={(e) => {
        props.onDragMove(e);
      }}
      onClick={props.onClick}
    >
      <Ellipse
        radiusX={width / 2}
        fill="white"
        radiusY={height / 2}
        x={newPosition.x}
        y={newPosition.y}
        stroke={props.selectedColor || "black"}
        //shadow
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.3}
      />
      <Text
        width={width}
        height={height}
        text={"/" + props.node.label}
        x={newPosition.x - width / 2}
        y={newPosition.y - height / 2}
        fontSize={22}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Node;

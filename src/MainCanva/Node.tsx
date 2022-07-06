import React from "react";
import { Ellipse, Text, Group, Circle } from "react-konva";

interface NodeProps {
  key?: string;
  label?: string;
  x: number;
  y: number;
  draggable?: boolean;
  selectedTool?: string | null;
}

const Node: React.FC<NodeProps> = ({ key, label, x, y, draggable, selectedTool }) => {
  const onNodeDrag = (e: any) => {
    console.log(e.target.position());
  };
  const width = 260;
  const height = 100;
  return (
    <Group draggable>
      <Circle radius={10} x={x - width / 2} y={y} fill={selectedTool === "connect" ? "black" : "white"} onDragMove={() => console.log("node")} onClick={() => console.log("node")} />
      <Circle radius={10} x={x + width / 2} y={y} fill={selectedTool === "connect" ? "black" : "white"} onClick={() => console.log("node")} />
      <Circle radius={10} x={x} y={y - height / 2} fill={selectedTool === "connect" ? "black" : "white"} onClick={() => console.log("node")} />
      <Circle radius={10} x={x} y={y + height / 2} fill={selectedTool === "connect" ? "black" : "white"} onClick={() => console.log("node")} />
      <Ellipse
        radiusX={width / 2}
        fill="white"
        radiusY={height / 2}
        x={x}
        y={y}
        stroke="black"
        onDragMove={(e) => {
          console.log(e.target.position());
        }}
        onClick={() => console.log("node")}
      />
      <Text
        width={width}
        height={height}
        text={label}
        x={x - width / 2}
        y={y - height / 2}
        onDragMove={(e) => {
          console.log(e.target.position());
        }}
        fontSize={22}
        align="center"
        verticalAlign="middle"
      />
    </Group>
  );
};

export default Node;

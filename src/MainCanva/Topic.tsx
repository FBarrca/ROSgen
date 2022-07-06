import React from "react";
import { Rect, Text, Group } from "react-konva";
import { handleDragStart, handleDragEnd } from "./Dragging";

interface TopicProps {
  key?: string;
  label?: string;
  x: number;
  y: number;
  draggable?: boolean;
}

const Topic: React.FC<TopicProps> = ({ key, label, x, y, draggable }) => (
  <Group draggable>
    <Rect width={120} height={60} x={x} y={y} stroke="black" />
    <Text width={120} height={60} text={label} x={x} y={y} fontSize={22} align="center" verticalAlign="middle" />
  </Group>
);

export default Topic;

import React from "react";
import { Rect, Text, Group } from "react-konva";

import { TopicProps } from "../../interfaces/MainCanvas";

interface Props {
  topic: TopicProps;
  onClick?: (e: any) => void;
  onDragMove: (e: any) => void;
  selectedColor: string | null;
}

const Topic: React.FC<Props> = (props) => (
  <Group
    draggable
    id={props.topic.id}
    onDragMove={(e) => {
      props.onDragMove(e);
    }}
    onClick={props.onClick}
    key={props.topic.id}
  >
    <Rect
      width={120}
      height={60}
      x={props.topic.position.x}
      y={props.topic.position.y}
      stroke={props.selectedColor || "black"}
      fill="white"
      //shadow
      shadowColor="black"
      shadowBlur={10}
      shadowOpacity={0.3}
    />
    <Text
      width={120}
      height={60}
      text={props.topic.label}
      x={props.topic.position.x}
      y={props.topic.position.y}
      fontSize={22}
      align="center"
      verticalAlign="middle"
    />
  </Group>
);

export default Topic;

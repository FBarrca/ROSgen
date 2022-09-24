import React from "react";
import { Rect, Text, Group } from "react-konva";

import { TopicProps } from "../../interfaces/MainCanvas";

interface TopicComponentProps {
  topic: TopicProps;
  onClick: (e: any) => void;
  onContextMenu: (e: any) => void;
  onDragMove: (e: any) => void;
  selectedColor: string | null;
}

const Topic: React.FC<TopicComponentProps> = (props) => (
  <Group
    draggable
    id={props.topic.id}
    onDragMove={(e) => {
      props.onDragMove(e);
    }}
    onClick={(e) => { e.evt.button === 0 && props.onClick(e) }}
      onContextMenu={(e) => { e.evt.preventDefault(); props.onContextMenu(e) }}
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
      text={"/" + props.topic.label}
      x={props.topic.position.x}
      y={props.topic.position.y}
      fontSize={22}
      align="center"
      verticalAlign="middle"
    />
  </Group>
);

export default Topic;

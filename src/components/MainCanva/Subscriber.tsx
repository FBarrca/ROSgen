import { KonvaEventObject } from "konva/lib/Node";
import React, { useContext } from "react";
import { Group, Arrow } from "react-konva";
import DrawerContext from "../../hooks/DrawerContext";
import { NodeProps, TopicProps } from "../../interfaces/MainCanvas";

interface SubscriberProps {
  id: string;
  fromTopic: TopicProps | any;
  toNode: NodeProps | any;

  // onClick: (e: any) => void;
}

const Subscriber: React.FC<SubscriberProps> = (props) => {
  const { drawerState, setDrawerState } = useContext(DrawerContext);

  const { id, fromTopic, toNode } = props;
  //Spawn position and drag offset for both topic and node
  const { x: toX, y: toY } = toNode.position;
  const { x: toXoffset, y: toYoffset } = toNode.offset;

  const { x: fromX, y: fromY } = fromTopic.position;
  const { x: fromXoffset, y: fromYoffset } = fromTopic.offset;

  const widthTopic = 120;
  const heightTopic = 60;
  const TopicPosition = {
    x: fromX + fromXoffset + widthTopic / 2,
    y: fromY + fromYoffset + heightTopic / 2,
  };
  const NodePosition = {
    x: toX + toXoffset,
    y: toY + toYoffset,
  };
  //size of Node
  const width = 260;
  const height = 100;
  //angle of the arrow
  // let NodeOffset = { x: 0, y: 0 };

  const angle = Math.atan2(NodePosition.y - TopicPosition.y, NodePosition.x - TopicPosition.x);
  const radius =
    (width * height) /
    4 /
    Math.sqrt(Math.pow((height / 2) * Math.cos(angle), 2) + Math.pow((width / 2) * Math.sin(angle), 2));
  //Offset arrow destination so it ends at the edge of the node
  const NodeOffset = {
    x: -radius * 1.05 * Math.cos(angle),
    y: -radius * 1.05 * Math.sin(angle),
  };
  const points = [TopicPosition.x, TopicPosition.y, NodePosition.x + NodeOffset.x, NodePosition.y + NodeOffset.y];

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    console.log("click publisher");
    setDrawerState({
      ...drawerState,
      type: "subscriber",
      content: {
        fromTopic: fromTopic,
        toNode: toNode,
      },
      visible: true,
    });
  };
  return (
    <Group>
      <Arrow key={id} points={points} hitStrokeWidth={20} stroke="black" fill="black" onClick={(e) => handleClick(e)} />
    </Group>
  );
};

export default Subscriber;

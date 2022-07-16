import React from "react";
import { Group, Arrow } from "react-konva";
import { NodeProps, TopicProps } from "../../interfaces/MainCanvas";

interface PublisherProps {
  id: string;
  fromNode: NodeProps | any;
  toTopic: TopicProps | any;
}
const Publisher: React.FC<PublisherProps> = (props) => {
  const { id, fromNode, toTopic } = props;
  //Spawn position and drag offset for both topic and node
  const { x: toX, y: toY } = toTopic.position;
  const { x: toXoffset, y: toYoffset } = toTopic.offset;
  const { x: fromX, y: fromY } = fromNode.position;
  const { x: fromXoffset, y: fromYoffset } = fromNode.offset;

  //
  const widthTopic = 120;
  const heightTopic = 60;
  const aspectratio = 0.5; //height/width -> 26 degrees

  const NodePosition = {
    x: fromX + fromXoffset,
    y: fromY + fromYoffset,
  };
  const TopicPosition = {
    x: toX + toXoffset + widthTopic / 2,
    y: toY + toYoffset + heightTopic / 2,
  };

  //angle of the arrow
  let NodeOffset = { x: 0, y: 0 };

  const angle = Math.atan2(TopicPosition.y - NodePosition.y, TopicPosition.x - NodePosition.x);

  if (Math.abs(angle) <= Math.atan(aspectratio)) {
    //angle is less than 26 degrees
    NodeOffset = {
      x: -widthTopic * 0.5,
      y: (-widthTopic / 2) * Math.sin(angle),
    };
  } else {
    if (Math.abs(angle) > Math.PI - Math.atan(aspectratio)) {
      NodeOffset = {
        x: widthTopic * 0.5,
        y: (-widthTopic / 2) * Math.sin(angle),
      };
    } else if (angle > 0) {
      NodeOffset = {
        x: (-widthTopic / 2) * Math.cos(angle),
        y: -heightTopic * 0.5,
      };
    } else {
      NodeOffset = {
        x: (-widthTopic / 2) * Math.cos(angle),
        y: heightTopic * 0.5,
      };
    }
  }
  const points = [NodePosition.x, NodePosition.y, TopicPosition.x + NodeOffset.x, TopicPosition.y + NodeOffset.y];

  return (
    <Group>
      <Arrow key={props.id} points={points} stroke="black" fill="black" />
    </Group>
  );
};

export default Publisher;

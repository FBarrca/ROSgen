import React from "react";
import { Text, Group } from "react-konva";

import { CommentProps } from "../../interfaces/MainCanvas";

interface Props {
  comment: CommentProps;
  onClick?: (e: any) => void;
  onDragMove: (e: any) => void;
}

const Comment: React.FC<Props> = (props) => (
  <Group
    draggable
    id={props.comment.id}
    onDragMove={(e) => {
      props.onDragMove(e);
    }}
    onClick={props.onClick}
    key={props.comment.id}
  >
    <Text
      width={300}
      // height={60}
      text={props.comment.label}
      x={props.comment.position.x}
      y={props.comment.position.y}
      fontSize={22}
      //color grey
      fill="grey"
      align="left"
      verticalAlign="middle"
    />
  </Group>
);

export default Comment;

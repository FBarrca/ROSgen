import React, { useContext, useEffect, useState, useMemo } from "react";
import { Stage, Layer } from "react-konva";
import Node from "./Node";
import ToolContext from "../context/ToolContext";
import Topic from "./Topic";
import CursorPositionContext from "../context/CursorPositionContext";
import DoubleClickInput from "./EditableText/DoubleClickInput";

interface TopicProps {
  x: number;
  y: number;
  id: string;
  label: string;
}
interface NodeProps {
  x: number;
  y: number;
  id: string;
  label: string;
  subscribers: TopicProps[];
  publishers: TopicProps[];
}
interface InputOnDoubleClickState {
  enabled: boolean;
  x: number;
  y: number;
}
const Canvas = () => {
  //Canvas View Scale and position state
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [CursorPostion, setCursorPostion] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const providerValue = useMemo(() => ({ CursorPostion, setCursorPostion }), [CursorPostion]);
  const { selectedTool } = useContext(ToolContext);
  //Input on double click state
  const [Input, setInput] = useState<InputOnDoubleClickState>({ enabled: false, x: 0, y: 0 });

  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const addNode = (node: NodeProps) => {
    setNodes([...nodes, node]);
  };
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const addTopic = (topic: TopicProps) => {
    setTopics([...topics, topic]);
  };
  const [text, setText] = useState<string>("");

  function toggleEdit() {
    if (Input.enabled && text.length > 0) {
      ToolAction();
      setText("");
    }
    setInput((prev) => ({ ...prev, enabled: !prev.enabled }));
  }
  const ToolAction = () => {
    switch (selectedTool) {
      case "node":
        addNode({
          x: Input.x,
          y: Input.y,
          id: nodes.length.toString(),
          label: "/" + text, // "Node " + (nodes.length + 1),
          subscribers: [],
          publishers: [],
        });
        break;
      case "topic":
        addTopic({
          x: Input.x,
          y: Input.y,
          id: topics.length.toString(),
          label: "/" + text, // "Topic " + (topics.length + 1),
        });
        break;
      case "select":
        break;
      default:
        break;
    }
  };
  /* The code above does the following:
Depending on the selected tool, the code adds a node or a topic to the canvas.
1. Adds a new node or to the graph.
2. Updates the graph view.
 */

  //Convert mouse position into canvas position
  const mouseToCanvasPosition = (e: any) => {
    const mousePointTo = {
      x: e.evt.x / scale - position.x / scale,
      y: e.evt.y / scale - position.y / scale,
    };
    return mousePointTo;
  };

  return (
    <div>
      <Stage
        width={window.innerWidth * 0.99}
        height={window.innerHeight * 0.99}
        scale={{ x: scale, y: scale }}
        position={position}
        //Zoom on stage
        onWheel={(event) => {
          event.evt.preventDefault();

          const { deltaY } = event.evt;

          const isScrollingUp = deltaY < 0;
          const updateScaleBy = 1.15; // The amount to scale (15%)
          const newScale = isScrollingUp ? scale * updateScaleBy : scale / updateScaleBy;

          const mousePointerPositionX = event.evt.x;
          const mousePointerPositionY = event.evt.y;
          const mousePointTo = {
            x: mousePointerPositionX / scale - position.x / scale,
            y: mousePointerPositionY / scale - position.y / scale,
          };
          const newPos = {
            x: -(mousePointTo.x - mousePointerPositionX / newScale) * newScale,
            y: -(mousePointTo.y - mousePointerPositionY / newScale) * newScale,
          };

          //max newScale is 5
          if (newScale > 5) return;
          setScale(newScale);
          setPosition(newPos);
        }}
        onClick={(e) => {
          // console.log(e.evt);
          // console.log(e.evt.x, e.evt.y);
          const emptySpace = e.target === e.target.getStage();
          if (!emptySpace) {
            return;
          }
          const canvasPosition = mouseToCanvasPosition(e);
          setInput((prevState) => ({ x: canvasPosition.x, y: canvasPosition.y, enabled: !prevState.enabled }));
        }}
      >
        <CursorPositionContext.Provider value={providerValue}>
          <Layer>
            <DoubleClickInput x={Input.x} y={Input.y} text={text} isEditing={Input.enabled} onToggleEdit={toggleEdit} onChange={(value: any) => setText(value)} />

            {nodes.map((node) => (
              <Node x={node.x} y={node.y} key={node.id} label={node.label} draggable selectedTool={selectedTool} />
            ))}

            {topics.map((topic) => (
              <Topic x={topic.x} y={topic.y} key={topic.id} label={topic.label} draggable />
            ))}
          </Layer>
        </CursorPositionContext.Provider>
      </Stage>
    </div>
  );
};

export default Canvas;

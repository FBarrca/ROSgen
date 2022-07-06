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

const Canvas = () => {
  const [CursorPostion, setCursorPostion] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const providerValue = useMemo(() => ({ CursorPostion, setCursorPostion }), [CursorPostion]);
  const { selectedTool } = useContext(ToolContext);
  const [enableInput, setEnableInput] = useState(false);
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
    if (enableInput && text.length > 0) {
      ToolAction();
      setText("");
    }
    setEnableInput(!enableInput);
    /* The code above does the following:
  If the input was enabled and the text is not empty.
  1. Then we call the ToolAction function.and set the text to an empty string.
  2. We set the enableInput to false.
  If the input was disabled we set the enableInput to true.
   */
  }
  const ToolAction = () => {
    switch (selectedTool) {
      case "node":
        addNode({
          x: CursorPostion.x,
          y: CursorPostion.y,
          id: nodes.length.toString(),
          label: "/" + text, // "Node " + (nodes.length + 1),
          subscribers: [],
          publishers: [],
        });
        break;
      case "topic":
        addTopic({
          x: CursorPostion.x,
          y: CursorPostion.y,
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

  useEffect(() => {
    const update = (e: { x: number; y: number }) => {
      setCursorPostion({ x: e.x, y: e.y });
    };
    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, [CursorPostion]);
  /* The code above does the following:
  1. Adds a listener to the window object.
  2. When the mouse moves, the update function is called.
  3. The update function sets the cursor position to the current mouse position.
  4. The update function is removed when the component is unmounted. */

  return (
    <div>
      <Stage
        width={window.innerWidth * 0.99}
        height={window.innerHeight * 0.99}
        onClick={(e) => {
          const emptySpace = e.target === e.target.getStage();
          if (!emptySpace) {
            return;
          }
          setEnableInput(true);
        }}
      >
        <CursorPositionContext.Provider value={providerValue}>
          <Layer>
            <DoubleClickInput text={text} isEditing={enableInput} onToggleEdit={toggleEdit} onChange={(value: any) => setText(value)} />

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

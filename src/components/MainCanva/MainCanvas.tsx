import React, { useContext, useState, useMemo, useEffect } from "react";
import { Stage, Layer } from "react-konva";

import ToolContext from "../../hooks/ToolContext";
import ScaleContext from "../../hooks/ScaleContext";
import PositionContext from "../../hooks/PositionContext";

import Node from "./Node";
import Topic from "./Topic";
import Subscriber from "./Subscriber";
import Publisher from "./Publisher";

import mouseToCanvasPosition from "./functions/mouseToCanvasPosition";
import DoubleClickInput from "./EditableText/DoubleClickInput";

import {
  CommentProps,
  ConnectionCreatorProps,
  InputOnDoubleClickState,
  NodeProps,
  PublisherProps,
  SubscriberProps,
  TopicProps,
} from "../../interfaces/MainCanvas";
import { KonvaEventObject } from "konva/lib/Node";

// import "../../interfaces/MainCanvas";
const Canvas = () => {
  //Canvas View Scale and position state
  const { scale, setScale } = useContext(ScaleContext);
  const providerValueScale = useMemo(() => ({ scale, setScale }), [scale, setScale]);
  const { position, setPosition } = useContext(PositionContext);
  const providerValuePosition = useMemo(() => ({ position, setPosition }), [position, setPosition]);
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);

  const { selectedTool } = useContext(ToolContext);
  //Input on double click state
  const [Input, setInput] = useState<InputOnDoubleClickState>({ enabled: false, x: 0, y: 0 });

  //Comment state, to store annotations on graph
  const [comments, setComments] = useState<CommentProps[]>([]);
  const addComment = (comment: CommentProps) => {
    setComments([...comments, comment]);
  };
  //Node state, to store nodes on graph
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const addNode = (node: NodeProps) => {
    setNodes([...nodes, node]);
  };
  //Topic state, to store topics on graph
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const addTopic = (topic: TopicProps) => {
    setTopics([...topics, topic]);
  };
  //Subscriber state, to store subscribers on graph
  const [subscribers, setSubscribers] = useState<SubscriberProps[]>([]);
  const addSubscriber = (sub: SubscriberProps) => {
    setSubscribers([...subscribers, sub]);
  };
  //ConnectionCreator State, stores the From element of the connection until the user clicks on the To element
  const [connectionCreator, setConnectionCreator] = useState<ConnectionCreatorProps>({
    fromNode: null,
    fromTopic: null,
  });
  //Publisher State
  const [publishers, setPublishers] = useState<PublisherProps[]>([]);
  const addPublisher = (pub: PublisherProps) => {
    setPublishers([...publishers, pub]);
  };
  //Text state, stores the text written in the input
  const [text, setText] = useState<string>("");

  //toggles the input state, if we are disabling the input, we perform the Toolaction with text and reset the input
  function handletoggleEdit() {
    if (Input.enabled && text.length > 0) {
      ToolAction();
      setText("");
    }
    setInput((prev) => ({ ...prev, enabled: !prev.enabled }));
  }
  //Tool action creates node, topic or comment depending on the selected tool
  const ToolAction = () => {
    switch (selectedTool) {
      case "node":
        addNode({
          position: { x: Input.x, y: Input.y },
          offset: { x: 0, y: 0 },
          id: nodes.length.toString(),
          label: "/" + text, // "Node " + (nodes.length + 1),
          subscribers: [],
          publishers: [],
        });
        break;
      case "topic":
        addTopic({
          position: { x: Input.x, y: Input.y },
          offset: { x: 0, y: 0 },
          id: topics.length.toString(),
          label: "/" + text, // "Topic " + (topics.length + 1),
        });
        break;
      case "comment":
        addComment({
          position: { x: Input.x, y: Input.y },
          offset: { x: 0, y: 0 },
          id: comments.length.toString(),
          label: text,
        });
        break;
      case "select":
        break;
      default:
        break;
    }
  };

  //Zoom on stage with mouse wheel
  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const { deltaY } = e.evt;

    const isScrollingUp = deltaY < 0;
    const updateScaleBy = 1.15; // The amount to scale (15%)
    const newScale = isScrollingUp ? scale * updateScaleBy : scale / updateScaleBy;

    const mousePostion = { x: e.evt.x, y: e.evt.y };
    const mousePointTo = mouseToCanvasPosition(mousePostion, scale, position);
    const newPos = {
      x: -(mousePointTo.x - mousePostion.x / newScale) * newScale,
      y: -(mousePointTo.y - mousePostion.y / newScale) * newScale,
    };
    // console.log(mousePointTo);
    //max newScale is 5
    if (newScale > 5) return;
    setScale(newScale);
    setPosition(newPos);
    if (!initialPosition) setInitialPosition(newPos);
  };

  //If the user clicks on empty space on canvas, the input is enabled
  const handleTextInput = (e: KonvaEventObject<MouseEvent>) => {
    const emptySpace = e.target === e.target.getStage();
    if (!emptySpace) {
      if (Input.enabled) {
        //If the input is enabled and clicked somewhere else, the input is disabled
        setInput((prev) => ({ ...prev, enabled: false }));
      }
      return;
    }
    const mouse = { x: e.evt.x, y: e.evt.y };
    const canvasPosition = mouseToCanvasPosition(mouse, scale, position);
    // console.log(canvasPosition);
    //Input position is updated on click and the textbox is toggled
    setInput((prev) => ({ x: canvasPosition.x, y: canvasPosition.y, enabled: !prev.enabled }));
  };

  const handleNodeClick = (e: KonvaEventObject<MouseEvent>, node: NodeProps) => {
    if (selectedTool === "connect") {
      if (connectionCreator.fromTopic == null) {
        //Creating a publisher
        setConnectionCreator({ ...connectionCreator, fromNode: node });
      } else {
        //Creating a subscriber
        const fromTopicId = connectionCreator.fromTopic;
        addSubscriber({
          id: subscribers.length.toString(),
          fromTopic: fromTopicId,
          toNode: node,
          fromOffset: { x: 0, y: 0 },
          toOffset: { x: 0, y: 0 },
        });
        const topic = topics.find((topic) => topic.id === fromTopicId.id);
        if (topic) node.subscribers.push(topic);
        setConnectionCreator({ fromNode: null, fromTopic: null }); //reset connectionCreator
      }
    }
  };
  const handleTopicClick = (e: KonvaEventObject<MouseEvent>, topic: TopicProps) => {
    if (selectedTool === "connect") {
      if (connectionCreator.fromNode == null) {
        //Creating a subscriber
        setConnectionCreator({ ...connectionCreator, fromTopic: topic });
      } else {
        //Creating a publisher
        const fromNodeId = connectionCreator.fromNode;
        addPublisher({
          id: subscribers.length.toString(),
          fromNode: fromNodeId,
          toTopic: topic,
        });
        // reset all connectionCreator
        setConnectionCreator({ fromNode: null, fromTopic: null });
      }
    }
  };
  const handleDragMoveNode = (e: KonvaEventObject<DragEvent>) => {
    const movingNode = e.target;
    const newPos = mouseToCanvasPosition(movingNode._lastPos, scale, position);
    const updatedNodes = nodes.map((node) => {
      if (node.id !== movingNode.attrs.id) {
        return node;
      }

      return {
        ...node,
        offset: {
          x: newPos.x,
          y: newPos.y,
        },
      };
    });

    // console.log(updatedNodes);
    setNodes(updatedNodes);
  };
  const handleDragMoveTopic = (e: KonvaEventObject<DragEvent>) => {
    //, element: TopicProps | NodeProps
    const movingTopic = e.target;
    const newPos = mouseToCanvasPosition(movingTopic._lastPos, scale, position);
    const updatedTopics = topics.map((topic) => {
      if (topic.id !== movingTopic.attrs.id) {
        return topic;
      }

      return {
        ...topic,
        offset: {
          x: newPos.x,
          y: newPos.y,
        },
      };
    });
    setTopics(updatedTopics);
  };

  useEffect(() => {
    console.log(connectionCreator.fromNode?.id);
    console.log(nodes.find((node) => node.id === connectionCreator.fromNode?.id));
    console.log(connectionCreator);
  }, [connectionCreator]);
  useEffect(() => {
    console.log("subscribers", subscribers);
  }, [subscribers]);
  useEffect(() => {
    console.log("publishers", publishers);
  }, [publishers]);

  return (
    <div>
      <Stage
        width={window.innerWidth * 0.99}
        height={window.innerHeight * 0.99}
        scale={{ x: scale, y: scale }}
        position={position}
        onWheel={handleZoom}
        onClick={handleTextInput}
        // onTap={handleTextInput}
      >
        <ScaleContext.Provider value={providerValueScale}>
          <PositionContext.Provider value={providerValuePosition}>
            <Layer>
              <DoubleClickInput
                x={Input.x}
                y={Input.y}
                text={text}
                isEditing={Input.enabled}
                onToggleEdit={handletoggleEdit}
                onChange={(value: any) => setText(value)}
              />
              {publishers.map((pub) => {
                return (
                  <Publisher
                    id={pub.id}
                    key={"Pub" + pub.id}
                    //Currently offset isnt updated on subscriber so we use the position of the topic and subscriber object
                    toTopic={topics.find((topic) => topic.id === pub.toTopic.id)}
                    fromNode={nodes.find((node) => node.id === pub.fromNode.id)}
                  />
                );
              })}
              {subscribers.map((sub) => {
                return (
                  <Subscriber
                    id={sub.id}
                    key={"Sub" + sub.id}
                    //Currently offset isnt updated on subscriber so we use the position of the topic and subscriber object
                    fromTopic={topics.find((topic) => topic.id === sub.fromTopic.id)}
                    toNode={nodes.find((node) => node.id === sub.toNode.id)}
                  />
                );
              })}
              {nodes.map((node) => (
                <Node
                  node={node}
                  key={"Node" + node.id}
                  selectedTool={selectedTool}
                  onClick={(e: KonvaEventObject<MouseEvent>) => handleNodeClick(e, node)}
                  onDragMove={(e: KonvaEventObject<DragEvent>) => handleDragMoveNode(e)}
                  selectedColor={node.id === connectionCreator.fromNode?.id ? "red" : "black"}
                />
              ))}

              {topics.map((topic) => (
                <Topic
                  topic={topic}
                  key={"Topic" + topic.id}
                  onClick={(e: KonvaEventObject<MouseEvent>) => handleTopicClick(e, topic)}
                  onDragMove={(e: KonvaEventObject<DragEvent>) => handleDragMoveTopic(e)}
                  selectedColor={topic.id === connectionCreator.fromTopic?.id ? "red" : "black"}
                />
              ))}
            </Layer>
          </PositionContext.Provider>
        </ScaleContext.Provider>
      </Stage>
    </div>
  );
};

export default Canvas;

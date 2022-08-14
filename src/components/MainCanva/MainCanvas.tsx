import React, { useContext, useState, useMemo, useEffect } from "react";
import { Stage, Layer } from "react-konva";

import ToolContext from "../../hooks/ToolContext";
import ScaleContext from "../../hooks/ScaleContext";
import PositionContext from "../../hooks/PositionContext";

import Node from "./Node";
import Topic from "./Topic";
import Comment from "./Comment";
import Subscriber from "./Subscriber";
import Publisher from "./Publisher";

import mouseToCanvasPosition from "./functions/mouseToCanvasPosition";
import DoubleClickInput from "./EditableText/DoubleClickInput";

import {
  CommentProps,
  ConnectionCreatorProps,
  InputOnDoubleClickState,
  NodeProps,
  TopicProps,
} from "../../interfaces/MainCanvas";
import { KonvaEventObject } from "konva/lib/Node";

import DrawerContext from "../../hooks/DrawerContext";
import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";
import DevicesContext from "../../hooks/DevicesContext";

// import "../../interfaces/MainCanvas";
const Canvas = () => {
  //Canvas View Scale and position state
  const { scale, setScale } = useContext(ScaleContext);
  const providerValueScale = useMemo(() => ({ scale, setScale }), [scale, setScale]);
  const { position, setPosition } = useContext(PositionContext);
  const providerValuePosition = useMemo(() => ({ position, setPosition }), [position, setPosition]);
  const [initialPosition, setInitialPosition] = useState<{ x: number; y: number } | null>(null);

  //Drawer state
  const { drawerState, setDrawerState } = useContext(DrawerContext);
  const providerValueDrawer = useMemo(() => ({ drawerState, setDrawerState }), [drawerState, setDrawerState]);
  const showDrawer = () => {
    setDrawerState({ ...drawerState, visible: true });
  };
  //Sidebar option state
  const { selectedTool } = useContext(ToolContext);
  //Input on double click state
  const [Input, setInput] = useState<InputOnDoubleClickState>({ enabled: false, x: 0, y: 0 });

  //Comment state, to store annotations on graph
  const [comments, setComments] = useState<CommentProps[]>([]);
  const addComment = (comment: CommentProps) => {
    setComments([...comments, comment]);
  };
  //Node state, to store nodes on graph
  // const [nodes, setNodes] = useState<NodeProps[]>([]);
  const { nodes, setNodes } = useContext(NodesContext);
  // const providerValueNodes = useMemo(() => ({ nodes, setNodes }), [nodes, setNodes]);

  const addNode = (node: NodeProps) => {
    setNodes([...nodes, node]);
    console.log("New nodes", nodes, "Added node", node);
  };
  //Topic state, to store topics on graph
  // const [topics, setTopics] = useState<TopicProps[]>([]);
  const { topics, setTopics } = useContext(TopicsContext);
  const addTopic = (topic: TopicProps) => {
    setTopics([...topics, topic]);
  };

  const { devices, setDevices } = useContext(DevicesContext);
  const providerValueDevices = useMemo(() => ({ devices, setDevices }), [devices, setDevices]);
  //ConnectionCreator State, stores the From element of the connection until the user clicks on the To element
  const [connectionCreator, setConnectionCreator] = useState<ConnectionCreatorProps>({
    fromNode: null,
    fromTopic: null,
  });

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
          label: text, // "Node " + (nodes.length + 1),
          subscribers: [],
          publishers: [],
          device: devices.selected,
          description: "",
        });
        break;
      case "topic":
        addTopic({
          position: { x: Input.x, y: Input.y },
          offset: { x: 0, y: 0 },
          id: topics.length.toString(),
          label: text, // "Topic " + (topics.length + 1),
          type: {
            class: "geometry_msgs",
            type: "Twist.msg",
          },

          //must source topy types from github //https://github.com/ros2/common_interfaces/blob/37ebe90cbfa91bcdaf69d6ed39c08859c4c3bcd4/geometry_msgs/msg/Twist.msg
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
    //Input position is updated on click and the textbox is toggled
    setInput((prev) => ({ x: canvasPosition.x, y: canvasPosition.y, enabled: !prev.enabled }));
  };

  const handleNodeClick = (e: KonvaEventObject<MouseEvent>, node: NodeProps) => {
    if (selectedTool === "connect") {
      // if it's the first click, set the fromTopic
      if (connectionCreator.fromTopic == null) {
        //Creating a publisher
        setConnectionCreator({ ...connectionCreator, fromNode: node });
      } else {
        //Creating a subscriber
        const fromTopic = connectionCreator.fromTopic;
        const topic = topics.find((topic) => topic.id === fromTopic.id);
        if (!topic) return;
        setNodes((prev) =>
          prev.map((n) => {
            if (n.id === node.id) {
              if (n.subscribers.find((sub) => sub.topicID === topic.id)) {
                return n; // If the node already has the topic as a subscriber, do nothing
              }
              console.log("subscriber added");
              n.subscribers.push({
                id: node.subscribers.length.toString(),
                topicID: fromTopic.id,
              });
            }
            return n;
          })
        );
        setConnectionCreator({ fromNode: null, fromTopic: null }); //reset connectionCreator
      }
    } else {
      setDrawerState({
        visible: true,
        content: node,
        type: "node",
      });
    }
  };
  const handleTopicClick = (e: KonvaEventObject<MouseEvent>, topic: TopicProps) => {
    if (selectedTool === "connect") {
      // if it's the first click, set the fromNode
      if (connectionCreator.fromNode == null) {
        //Creating a subscriber
        setConnectionCreator({ ...connectionCreator, fromTopic: topic });
      } else {
        //Creating a publisher
        const fromNode = connectionCreator.fromNode;
        const node = nodes.find((node) => node.id === fromNode.id);
        if (!node) return;
        setNodes((prev) =>
          prev.map((n) => {
            if (n.id === node.id) {
              if (n.publishers.find((sub) => sub.topicID === topic.id)) {
                return n; // If the node already has the topic as a publisher, do nothing
              }
              console.log("publisher added");
              n.publishers.push({
                id: node.publishers.length.toString(),
                topicID: topic.id,
                QOS: {
                  history: "last",
                  depth: 10,
                  reliability: "reliable",
                  durability: "transient_local",
                },
                rate: 10,
              });
            }
            return n;
          })
        );
        setConnectionCreator({ fromNode: null, fromTopic: null });
      }
    } else {
      //If the user is not connecting nodes, we select the topic and show on the drawer
      setDrawerState({
        visible: true,
        content: topic,
        type: "topic",
      });
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

  // useEffect(() => {
  //   console.log("Nodes", nodes);
  // }, [nodes]);
  useEffect(() => {
    setConnectionCreator({ fromNode: null, fromTopic: null });
  }, [selectedTool]);

  const findColor = (deviceId: number) => {
    return devices.list.find((device) => device.id === deviceId)?.color || "black";
  };

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
        {/* Because of how Konva works, we need to use providers again */}
        {/* <NodesContext.Provider value={providerValueNodes}> */}
        <DrawerContext.Provider value={providerValueDrawer}>
          <ScaleContext.Provider value={providerValueScale}>
            <PositionContext.Provider value={providerValuePosition}>
              <DevicesContext.Provider value={providerValueDevices}>
                <Layer>
                  <DoubleClickInput
                    x={Input.x}
                    y={Input.y}
                    text={text}
                    isEditing={Input.enabled}
                    onToggleEdit={handletoggleEdit}
                    onChange={(value: any) => setText(value)}
                  />
                  {nodes.map((node) => {
                    return node.subscribers.map((sub) => {
                      return (
                        <Subscriber
                          id={sub.id}
                          key={"Sub" + sub.id}
                          //Currently offset isnt updated on subscriber so we use the position of the topic and subscriber object
                          fromTopic={topics.find((topic) => topic.id === sub.topicID)}
                          toNode={node}
                          // onClick={handleSubscriberClick(e)}
                        />
                      );
                    });
                  })}
                  {nodes.map((node) => {
                    return node.publishers.map((pub) => {
                      return (
                        <Publisher
                          id={pub.id}
                          key={"Pub" + pub.id}
                          //Currently offset isnt updated on subscriber so we use the position of the topic and subscriber object
                          toTopic={topics.find((topic) => topic.id === pub.topicID)}
                          fromNode={node}
                          // onClick={(e: KonvaEventObject<MouseEvent>) => console.log("comment clicked")}
                        />
                      );
                    });
                  })}
                  {nodes.map((node) => {
                    return (
                      <Node
                        node={node}
                        key={"Node" + node.id}
                        selectedTool={selectedTool}
                        onClick={(e: KonvaEventObject<MouseEvent>) => handleNodeClick(e, node)}
                        onDragMove={(e: KonvaEventObject<DragEvent>) => handleDragMoveNode(e)}
                        selectedColor={node.id === connectionCreator.fromNode?.id ? "red" : findColor(node.device)}
                      />
                    );
                  })}
                  {topics.map((topic) => (
                    <Topic
                      topic={topic}
                      key={"Topic" + topic.id}
                      onClick={(e: KonvaEventObject<MouseEvent>) => handleTopicClick(e, topic)}
                      onDragMove={(e: KonvaEventObject<DragEvent>) => handleDragMoveTopic(e)}
                      selectedColor={topic.id === connectionCreator.fromTopic?.id ? "red" : "black"}
                    />
                  ))}
                  {comments.map((comment) => (
                    <Comment
                      comment={comment}
                      key={"Comment " + comment.id}
                      onClick={(e: KonvaEventObject<MouseEvent>) => console.log("comment clicked")}
                      onDragMove={(e: KonvaEventObject<DragEvent>) => console.log("comment dragged")}
                    />
                  ))}
                </Layer>
              </DevicesContext.Provider>
            </PositionContext.Provider>
          </ScaleContext.Provider>
        </DrawerContext.Provider>
      </Stage>
    </div>
  );
};

export default Canvas;

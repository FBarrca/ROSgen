 

import React, { useContext } from "react";

import { NodeProps } from "../../interfaces/MainCanvas";
import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";
import { KonvaEventObject } from "konva/lib/Node";

interface ContextMenuDeleteProps {

    onOptionSelected: (option: string) => void;
  }
  




const ContextMenuDelete : React.FC<ContextMenuDeleteProps> = (props) => {
    const { nodes, setNodes } = useContext(NodesContext);
  const { topics, setTopics } = useContext(TopicsContext);
  
    
    // const handleNodeDelete = (e: KonvaEventObject<MouseEvent>, node: NodeProps) => {

    //     //Delete all connections
    //     setNodes((prev) =>
    //       prev.map((n) => {
    //         if (n.id === node.id) {
    //           n.publishers = [];
    //           n.subscribers = [];
    //         }
    //         return n;
    //       })
    //     );
    //     //Delete node
    //     setNodes((prev) => prev.filter((n) => n.id !== node.id));
    
    //   };
    //   const handleTopicDelete = (e: KonvaEventObject<MouseEvent>, topic: TopicProps) => {
    //     //Delete all connections to the topic
    //     setNodes((prev) =>
    //       prev.map((n) => {
    //         n.publishers = n.publishers.filter((p) => p.topicID !== topic.id);
    //         n.subscribers = n.subscribers.filter((s) => s.topicID !== topic.id);
    //         return n;
    //       })
    //     );
    //     //Delete topic
    //     setTopics((prev) => prev.filter((t) => t.id !== topic.id));
    //   }
  
  
    const handleOptionSelected = (option: string) => {
    props.onOptionSelected(option);
    };
// 
  return (
    

    <div
    //   className="menu"
    //   style={{
    //     position: "absolute",
    //     left: position.x,
    //     top: position.y
    //   }}
    >
      {/* <ul>
        <li onClick={() => handleOptionSelected("delete")}>Delete</li>

        <li onClick={() =>handleOptionSelected("option2")}>Option2</li>
      </ul> */}
    </div>
  );
};

export default ContextMenuDelete;

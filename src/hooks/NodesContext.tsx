import React, { createContext } from "react";
import { NodeProps } from "../interfaces/MainCanvas";

type NodesContextType = {
  nodes: NodeProps[];
  setNodes: React.Dispatch<React.SetStateAction<NodeProps[]>>;
};

const iNodesContext: { nodes: NodeProps[]; setNodes: any } = {
  nodes: [],
  setNodes: () => {},
};

const NodesContext = createContext<NodesContextType>(iNodesContext);

export default NodesContext;

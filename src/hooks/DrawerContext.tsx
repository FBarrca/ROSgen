import React, { createContext } from "react";
// import { NodeProps, PublisherProps, SubscriberProps, TopicProps } from "../interfaces/MainCanvas";

//Position context for cursor position on one state

export interface drawerState {
  visible: boolean;
  content: NodeContent | TopicContent | PubContent | SubContent | any;
  type: "topic" | "node" | "subscriber" | "publisher" | "none";
}
interface NodeContent {
  id: string;
}
interface TopicContent {
  id: string;
}
interface PubContent {
  fromNode: string;
  toTopic: string;
}
interface SubContent {
  fromTopic: string;
  toNode: string;
}

type DrawerContextType = {
  drawerState: drawerState;
  setDrawerState: React.Dispatch<React.SetStateAction<drawerState>>;
};

const iDrawerContext: { drawerState: drawerState; setDrawerState: any } = {
  //type of drawerstate
  drawerState: {
    visible: false,
    content: null,
    type: "none",
  },
  setDrawerState: () => {},
};

const DrawerContext = createContext<DrawerContextType>(iDrawerContext);

export default DrawerContext;

export interface TopicProps {
  position: {
    // initial position of the node
    x: number;
    y: number;
  };
  offset: {
    // offset is used to offset the node when dragged
    x: number;
    y: number;
  };
  id: string;
  label: string;
}
export interface SubscriberProps {
  id: string;
  fromTopic: TopicProps;
  fromOffset: {
    x: number;
    y: number;
  };
  toNode: NodeProps;
  toOffset: {
    x: number;
    y: number;
  };
}
export interface PublisherProps {
  id: string;
  fromNode: NodeProps;
  toTopic: TopicProps;
}
export interface ConnectionCreatorProps {
  fromTopic: TopicProps | null;
  fromNode: NodeProps | null;
}
export interface NodeProps {
  position: {
    // initial position of the node
    x: number;
    y: number;
  };
  offset: {
    // offset is used to offset the node when dragged
    x: number;
    y: number;
  };
  id: string;
  label: string;
  subscribers: TopicProps[];
  publishers: TopicProps[];
}
export interface CommentProps {
  id: string;
  label: string;
  position: {
    x: number;
    y: number;
  };
  offset: {
    // offset is used to offset the node when dragged
    x: number;
    y: number;
  };
}
export interface InputOnDoubleClickState {
  enabled: boolean;
  x: number;
  y: number;
}

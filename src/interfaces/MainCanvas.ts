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
  subscribers: {
    id: string;
    topicID: string; //Topicid
  }[];
  publishers: {
    id: string;
    topicID: string; //Topicid
  }[];
}
  toTopic: TopicProps;
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

export interface ConnectionCreatorProps {
  fromTopic: TopicProps | null;
  fromNode: NodeProps | null;
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

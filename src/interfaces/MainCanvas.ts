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
  subscribers: SubscriberProps[];
  publishers: PublisherProps[];
  device: number;
  description: String;
}
export interface DeviceProps {
  color: string;
  name: string;
  id: number;
}
export interface SubscriberProps {
  id: string;
  topicID: string; //Topicid
}
export interface PublisherProps {
  id: string;
  topicID: string; //Topicid
  QOS: QOSProps;
  rate: number;
}
export interface QOSProps {
  history: "last" | "all";
  //number bigger than 0
  depth: number;
  reliability: "reliable" | "best_effort";
  durability: "transient_local" | "volatile";
}

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
  type: {
    class: string;
    type: string;
  };
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

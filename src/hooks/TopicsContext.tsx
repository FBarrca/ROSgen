import React, { createContext } from "react";
import { TopicProps } from "../interfaces/MainCanvas";

type TopicsContextType = {
  topics: TopicProps[];
  setTopics: React.Dispatch<React.SetStateAction<TopicProps[]>>;
};

const iTopicsContext: { topics: TopicProps[]; setTopics: any } = {
  topics: [],
  setTopics: () => {},
};

const TopicsContext = createContext<TopicsContextType>(iTopicsContext);

export default TopicsContext;

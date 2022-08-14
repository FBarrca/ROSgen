import React, { FC, useState, useMemo } from "react";
import "./App.less";
import Sidebar from "./components/SideBar/Sidebar";
import BottomBar from "./components/BottomBar/BottomBar";
import Canvas from "./components/MainCanva/MainCanvas";
import ToolContext from "./hooks/ToolContext";
import ScaleContext from "./hooks/ScaleContext";
import PositionContext from "./hooks/PositionContext";
import DrawerContext, { drawerState } from "./hooks/DrawerContext";
import InfoDrawer from "./components/Drawer/Drawer";
import { DeviceProps, NodeProps, TopicProps } from "./interfaces/MainCanvas";
import NodesContext from "./hooks/NodesContext";
import TopicsContext from "./hooks/TopicsContext";
import DevicesContext from "./hooks/DevicesContext";
import DevicesBar from "./components/DevicesBar/DevicesBar";
import colorPallete from "./constants/colorPallete.json";

const App: FC = () => {
  //Sidebar option state
  const [selectedTool, setSelectedTool] = useState<string | null>("node");
  const providerValueTool = useMemo(() => ({ selectedTool, setSelectedTool }), [selectedTool, setSelectedTool]);

  //Canvas View Scale and position states
  const [scale, setScale] = useState<number>(1);
  const providerValueScale = useMemo(() => ({ scale, setScale }), [scale, setScale]);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const providerValuePosition = useMemo(() => ({ position, setPosition }), [position, setPosition]);

  //Node and Topic states
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const providerValueNodes = useMemo(() => ({ nodes, setNodes }), [nodes, setNodes]);
  const [topics, setTopics] = useState<TopicProps[]>([]);
  const providerValueTopics = useMemo(() => ({ topics, setTopics }), [topics, setTopics]);

  //Device states
  const [devices, setDevices] = useState({
    selected: 0,
    list: [
      {
        name: "Device 1",
        id: 0,
        color: colorPallete[0],
      },
    ],
  });
  const providerValueDevices = useMemo(() => ({ devices, setDevices }), [devices, setDevices]);
  //Drawer states
  const [drawerState, setDrawerState] = useState<drawerState>({
    visible: false,
    content: null,
    type: "none",
  });
  const providerValueDrawer = useMemo(() => ({ drawerState, setDrawerState }), [drawerState, setDrawerState]);

  return (
    <div className="App">
      <ToolContext.Provider value={providerValueTool}>
        <ScaleContext.Provider value={providerValueScale}>
          <PositionContext.Provider value={providerValuePosition}>
            <NodesContext.Provider value={providerValueNodes}>
              <TopicsContext.Provider value={providerValueTopics}>
                <DevicesContext.Provider value={providerValueDevices}>
                  <DrawerContext.Provider value={providerValueDrawer}>
                    <InfoDrawer />
                    <Canvas />
                    <div className="vertical-center">
                      <Sidebar />
                    </div>
                    <DevicesBar />
                    <BottomBar />
                  </DrawerContext.Provider>
                </DevicesContext.Provider>
              </TopicsContext.Provider>
            </NodesContext.Provider>
          </PositionContext.Provider>
        </ScaleContext.Provider>
      </ToolContext.Provider>
    </div>
  );
};

export default App;

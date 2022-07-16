import React, { FC, useEffect, useState, useMemo } from "react";
import "./App.less";
import Sidebar from "./components/SideBar/Sidebar";
import BottomBar from "./components/BottomBar/BottomBar";
import Canvas from "./components/MainCanva/MainCanvas";
import ToolContext from "./hooks/ToolContext";
import ScaleContext from "./hooks/ScaleContext";
import PositionContext from "./hooks/PositionContext";

const App: FC = () => {
  //Sidebar option state
  const [selectedTool, setSelectedTool] = useState<string | null>("node");
  const providerValueTool = useMemo(() => ({ selectedTool, setSelectedTool }), [selectedTool, setSelectedTool]);

  //Canvas View Scale and position states
  const [scale, setScale] = useState<number>(1);
  const providerValueScale = useMemo(() => ({ scale, setScale }), [scale, setScale]);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const providerValuePosition = useMemo(() => ({ position, setPosition }), [position, setPosition]);

  useEffect(() => {
    // console.log(selectedTool);
  }, [setSelectedTool]);
  return (
    <div className="App">
      <ToolContext.Provider value={providerValueTool}>
        <ScaleContext.Provider value={providerValueScale}>
          <PositionContext.Provider value={providerValuePosition}>
            <Canvas />
            <div className="vertical-center">
              <Sidebar />
            </div>
            <BottomBar />
          </PositionContext.Provider>
        </ScaleContext.Provider>
      </ToolContext.Provider>
    </div>
  );
};

export default App;

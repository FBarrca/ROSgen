import React, { FC, useEffect, useState, useMemo } from "react";
import "./App.less";
import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar/BottomBar";
import Canvas from "./MainCanva/MainCanvas";
import ToolContext from "./context/ToolContext";
import ScaleContext from "./context/ScaleContext";

const App: FC = () => {
  //Sidebar option state
  const [selectedTool, setSelectedTool] = useState<string | null>("node");
  const providerValueTool = useMemo(() => ({ selectedTool, setSelectedTool }), [selectedTool, setSelectedTool]);
  const [scale, setScale] = useState<number>(1);
  const providerValueScale = useMemo(() => ({ scale, setScale }), [scale, setScale]);

  useEffect(() => {
    // console.log(selectedTool);
  }, [setSelectedTool]);
  return (
    <div className="App">
      <ToolContext.Provider value={providerValueTool}>
        <ScaleContext.Provider value={providerValueScale}>
          <Canvas />
          <div className="vertical-center">
            <Sidebar />
          </div>
          <BottomBar />
        </ScaleContext.Provider>
      </ToolContext.Provider>
    </div>
  );
};

export default App;

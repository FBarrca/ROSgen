import React, { FC, useEffect, useState, useMemo } from "react";
import "./App.less";
import Sidebar from "./Sidebar";
import Canvas from "./MainCanva/MainCanvas";
import ToolContext from "./context/ToolContext";

const App: FC = () => {
  //Sidebar option state
  const [selectedTool, setSelectedTool] = useState<string | null>("node");
  const providerValue = useMemo(() => ({ selectedTool, setSelectedTool }), [selectedTool, setSelectedTool]);

  useEffect(() => {
    // console.log(selectedTool);
  }, [setSelectedTool]);
  return (
    <div className="App">
      <ToolContext.Provider value={providerValue}>
        <Canvas />
        <div className="vertical-center">
          <Sidebar />
        </div>
      </ToolContext.Provider>
    </div>
  );
};

export default App;

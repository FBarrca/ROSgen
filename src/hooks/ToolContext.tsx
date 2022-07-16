import React, { createContext } from "react";

type ToolContextType = {
  selectedTool: string | null;
  setSelectedTool: React.Dispatch<React.SetStateAction<string | null>>;
};

const iToolContextState = {
  selectedTool: null,
  setSelectedTool: () => {},
};

const ToolContext = createContext<ToolContextType>(iToolContextState);

export default ToolContext;

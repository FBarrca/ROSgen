import React, { createContext } from "react";

type PositionContextType = {
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

const iPositionContextState = {
  position: { x: 0, y: 0 },
  setPosition: () => {},
};

const PositionContext = createContext<PositionContextType>(iPositionContextState);

export default PositionContext;

import React, { FC, useEffect, useState, createContext } from "react";

//Position context for cursor position on one state
type CursorPositionContextType = {
  CursorPostion: { x: number; y: number };
  setCursorPostion: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
};

const iCursorPositionContextState = {
  CursorPostion: { x: 0, y: 0 },
  setCursorPostion: () => {},
};

const CursorPositionContext = createContext<CursorPositionContextType>(iCursorPositionContextState);

export default CursorPositionContext;

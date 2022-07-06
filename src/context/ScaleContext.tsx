import React, { FC, useEffect, useState, createContext } from "react";

type ScaleContextType = {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
};

const iScaleContextState = {
  scale: 1,
  setScale: () => {},
};

const ScaleContext = createContext<ScaleContextType>(iScaleContextState);

export default ScaleContext;

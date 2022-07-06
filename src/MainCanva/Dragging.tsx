export const handleDragStart = (e: any, setState: React.Dispatch<React.SetStateAction<any>>, state: any) => {
  const id = e.target.id();
  setState(
    state.map((element: any) => {
      return {
        ...element,
        isDragging: element.id === id,
      };
    })
  );
};
export const handleDragEnd = (e: any, setState: React.Dispatch<React.SetStateAction<any>>, state: any) => {
  setState(
    state.map((element: any) => {
      return {
        ...element,
        isDragging: false,
      };
    })
  );
};

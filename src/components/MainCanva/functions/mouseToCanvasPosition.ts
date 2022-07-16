//Convert mouse position into canvas position

const mouseToCanvasPosition = (mouse: { x: number; y: number }, scale: number, position: { x: number; y: number }) => {
  const mousePointTo = {
    x: mouse.x / scale - position.x / scale,
    y: mouse.y / scale - position.y / scale,
  };
  return mousePointTo;
};

export default mouseToCanvasPosition;

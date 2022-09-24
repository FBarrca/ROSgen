 

import React from "react";

interface ContextMenuDeleteProps {

    onOptionSelected: (option: string) => void;
  }
  

const ContextMenuDelete : React.FC<ContextMenuDeleteProps> = (props) => {
  const handleOptionSelected = (option: string) => {
    props.onOptionSelected(option);
    };
// 
  return (
    <div
    //   className="menu"
    //   style={{
    //     position: "absolute",
    //     left: position.x,
    //     top: position.y
    //   }}
    >
      <ul>
        <li onClick={() => handleOptionSelected("delete")}>Delete</li>

        <li onClick={() =>handleOptionSelected("option2")}>Option2</li>
      </ul>
    </div>
  );
};

export default ContextMenuDelete;

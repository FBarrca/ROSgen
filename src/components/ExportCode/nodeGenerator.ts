// Export function

import { NodeProps, TopicProps, DeviceProps } from "../../interfaces/MainCanvas";

import { saveAs } from "file-saver";
import { file } from "jszip";

var zip = require("jszip")();

const NodeGenerator = (node: NodeProps): string => {
  var code = `
  import rclpy
from rclpy.node import Node
`;
  

  return code;
};
export default NodeGenerator;

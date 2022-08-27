// Export function

import { NodeProps, TopicProps, DeviceProps } from "../../interfaces/MainCanvas";

import { saveAs } from "file-saver";
import { file } from "jszip";
import NodeGenerator from "./nodeGenerator";

var zip = require("jszip")();

const CodeGenerator = (nodes: NodeProps[], topics: TopicProps[], devices: DeviceProps[]) => {
  var code = "Hello World";
  nodes.forEach((node) => {
    code = NodeGenerator(node);
    node.publishers.forEach((publisher) => {
      code += TopicGenerator(publisher);
    }),
      node.subscribers.forEach((subscriber) => {
        code += TopicGenerator(subscriber);
      }),
      zip.file(node.label + ".py", code);
  });
  // zip.file("Hello.txt", "Hello World\n");
  console.log(nodes);
  zip.generateAsync({ type: "blob" }).then(function (content: any) {
    // see FileSaver.js
    saveAs(content, "example.zip");
  });
};
export default CodeGenerator;

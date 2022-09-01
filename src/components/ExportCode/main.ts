

import { NodeProps, TopicProps, DeviceProps } from "../../interfaces/MainCanvas";

import { saveAs } from "file-saver";
import { file } from "jszip";
import setupPy from "./setuppy";
import { packagexml } from "./packagexml";
var zip = require("jszip")();

const CodeGenerator = (
  nodes: NodeProps[], topics: TopicProps[], devices: DeviceProps[]
) => {

  
  devices.forEach(device => {
  var console_scripts = "";
  var uniquetypes: {class: string,type: string}[] = [];
  var nodesinPackage = nodes.filter(node => node.device === device.id);

  nodesinPackage.forEach((node) => {
  var code = `#!usr/bin/env/python3\n# -*- coding: utf-8 -*-\nimport rclpy\nfrom rclpy.node import Node\n`;
  // array of topics found to be subscribed to
  var subscribers : any[] = [];
  node.subscribers.forEach((subscriber) => {
    subscribers.push({... topics.find((topic) => topic.id === subscriber.topicID), rate: subscriber.rate});
  });
  // array of topics found to be published to
  var publishers: any[] = [];
  node.publishers.forEach((publisher) => {
    publishers.push({...topics.find((topic) => topic.id === publisher.topicID),rate: publisher.rate});
  });
  // array of types of topics found to be subscribed and published to
   uniquetypes = [
    ...new Map([...subscribers, ...publishers].map((item) => [item?.type.type, item?.type])).values(),
  ];
  uniquetypes.forEach((type) => {
    code += `\nfrom ${type?.class}.msg import ${type?.type.split(".")[0]}`;
  });

  code += `\n\nclass ${node.label}(Node):
    def __init__(self):
      super().__init__('${node.label}')
      self.get_logger().info('${node.label} node started')`;

  subscribers.forEach((subscriber) => {
    code += `\n        self.${subscriber?.label}_subscriber = self.create_subscription(${subscriber?.type.type.split(".")[0]}, '${subscriber?.label}', self.${subscriber?.label}_callback, 10)`;
  });

  publishers.forEach((publisher) => {
    code += `\n        self.${publisher?.label}_publisher = self.create_publisher(${publisher?.type.type.split(".")[0]}, '${publisher?.label}',10)\n        self.create_timer(0.5, self.send_cmd_vel)`; 
    
  });

  subscribers.forEach((subscriber) => {
    code += `\n    def ${subscriber?.label}_callback(self, msg):
      self.get_logger().info('I received a ${subscriber?.label} message')`;
  }
  );
  publishers.forEach((publisher) => {
    code += `\n    def send_${publisher.label}(self):
      msg = ${publisher?.type.type.split(".")[0]}()
      ###########################
      #add message content here
      ###########################
      self.${publisher?.label}_publisher.publish(msg)
      self.get_logger().info('I published a ${publisher?.label} message')`;
  }
  );
    code += `\ndef main(args=None):
    rclpy.init(args=args) #Initialize rclpy (ROS2)
    node = DrawCircleNode()    #Create a node of class DrawCircleNode
    rclpy.spin(node)      #Spin the node until the program is interrupted Keep the node alive until Ctrl+C is pressed
    rclpy.shutdown()    #Destroy the node before closing the program

def __init__(self): 
    main() 
    `
   console_scripts += `'${device.name}: ${device.name}.${node.label}:main',\n`;
//create a python file for each node inside the resources folder
zip.file(`${device.name}/${node.label}.py`, code);

  });
  zip.folder(`test`)
  zip.file(`${device.name}/,__init__.py`, "");
  zip.file(`resource/${device.name}`, "");
  zip.file("package.xml",packagexml(device.name,uniquetypes.map((type) => type.class)));
  zip.file("setup.py", setupPy(device.name, console_scripts));
  zip.file("setup.cfg", `[develop]\nscript_dir=$base/lib/${device.name}\n[install]\ninstall_scripts=$base/lib/${device.name}`);
  zip.generateAsync({ type: "blob" }).then(function (content: any) {
    // see FileSaver.js
    saveAs(content, `Package_${device.name}.zip`);
  });
});

};
export default CodeGenerator;

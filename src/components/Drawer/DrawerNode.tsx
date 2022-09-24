import { Button, Typography, Drawer, Form, Row, Col, Input, List, Select } from "antd";
import React, { useContext } from "react";
import DrawerContext from "../../hooks/DrawerContext";
import { KonvaEventObject } from "konva/lib/Node";
import { NodeProps } from "../../interfaces/MainCanvas";



import { PublisherProps, SubscriberProps } from "../../interfaces/MainCanvas";
import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";
import DevicesContext from "../../hooks/DevicesContext";
import { DeleteOutlined } from "@ant-design/icons";
import { camelCase } from "../ExportCode/camelCase";

const { Text, Link } = Typography;

const DrawerNode: React.FC = (props) => {
  const { drawerState, setDrawerState } = useContext(DrawerContext);
  const { devices, setDevices } = useContext(DevicesContext);
  const { nodes, setNodes } = useContext(NodesContext);
  const { topics, setTopics } = useContext(TopicsContext);
  const onClose = () => {
    setDrawerState({ ...drawerState, visible: false });
  };

  const handleNodeDelete = (node: NodeProps) => {

    //Delete all connections
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === node.id) {
          n.publishers = [];
          n.subscribers = [];
        }
        return n;
      })
    );
    //Delete node
    setNodes((prev) => prev.filter((n) => n.id !== node.id));

  };

  const node = nodes.find((node) => node.id === drawerState.content.id);
  return (
    <Drawer
      maskStyle={{ backgroundColor: "transparent" }}
      title={`Node: ${drawerState.content.label}`}
      onClose={onClose}
      visible={drawerState.visible}
      bodyStyle={{
        marginBottom: "0px",
        paddingBottom: "0px",
      }}
      extra={<>{ <Button type="primary" icon={<DeleteOutlined />} onClick={(e) => handleNodeDelete(node!)}> Delete </Button> }</>}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        // onFinish={handleSave}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={"Node name"} rules={[{ required: true, message: "A name must be chosen for the topic" }]}>
              <Text
                editable={{
                  onChange: (e) => {
                    if (node) {
                      node.label = camelCase(e);
                      setNodes([...nodes]);
                    }
                  },
                }}
              >
                {node?.label}
              </Text>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ID" rules={[{ required: true, message: "Please enter an id" }]}>
              {node?.id}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Device" rules={[{ required: false }]}>
              <Select
                // defaultValue={node?.device}
                value={node?.device}
                onChange={(value) => {
                  node!.device = value;
                  setNodes([...nodes]);
                }}
              >
                {devices.list.map((device) => {
                  return (
                    <Select.Option key={device.id} value={device.id}>
                      {device.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description" rules={[{ required: false }]}>
              <Input.TextArea rows={4} placeholder="Optional description explaining the node's function" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Subscribers" rules={[{ required: false }]}>
              <List
                size="small"
                bordered
                locale={{ emptyText: "No subscribers" }}
                dataSource={node?.subscribers}
                renderItem={(item: SubscriberProps) => (
                  <List.Item>
                    <Link
                      onClick={() => {
                        setDrawerState({
                          content: {
                            fromTopic: topics.find((topic) => topic.id === item.topicID),
                            toNode: nodes.find((node) => node.id === drawerState.content.id),
                          },
                          type: "subscriber",
                          visible: true,
                        });
                      }}
                    >
                      {topics.find((topic) => topic.id === item.topicID)?.label}
                    </Link>
                  </List.Item>
                )}
                style={{
                  maxHeight: "340px",
                  minHeight: "40px",
                  overflowY: "scroll",
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Publishers" rules={[{ required: false }]}>
              <List
                size="small"
                bordered
                locale={{ emptyText: "No publishers" }}
                dataSource={node?.publishers}
                renderItem={(item: PublisherProps) => (
                  <List.Item>
                    <Link
                      onClick={() => {
                        setDrawerState({
                          content: {
                            fromNode: nodes.find((node) => node.id === drawerState.content.id),
                            toTopic: topics.find((topic) => topic.id === item.topicID),
                          },
                          type: "publisher",
                          visible: true,
                        });
                      }}
                    >
                      {topics.find((topic) => topic.id === item.topicID)?.label}
                    </Link>
                  </List.Item>
                )}
                style={{
                  maxHeight: "340px",
                  minHeight: "40px",
                  overflowY: "scroll",
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default DrawerNode;

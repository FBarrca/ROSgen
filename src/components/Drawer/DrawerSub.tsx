import { CaretRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Typography, Drawer, Form, Row, Col, Input, Slider, InputNumber, Collapse, Select } from "antd";
import React, { useContext, useState } from "react";
import DrawerContext from "../../hooks/DrawerContext";

import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";

import { NodeProps, SubscriberProps, TopicProps } from "../../interfaces/MainCanvas";
const { Text, Title, Link } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const DrawerSub: React.FC = (props) => {
  const { drawerState, setDrawerState } = useContext(DrawerContext);
  const { nodes, setNodes } = useContext(NodesContext);
  const { topics, setTopics } = useContext(TopicsContext);
  const onClose = () => {
    setDrawerState({ ...drawerState, visible: false });
  };

  const [inputValue, setInputValue] = useState(1);

  const toNode: NodeProps | undefined = nodes.find((node) => node.id === drawerState.content.toNode.id);
  const fromTopic: TopicProps | undefined = topics.find((topic) => topic.id === drawerState.content.fromTopic.id);

  console.log("toNode", toNode);
  console.log("fromTopic", fromTopic);
  console.log("drawerState.content", drawerState.content);

  const subscriber: SubscriberProps | undefined = toNode?.subscribers.find(
    (sub) => sub.topicID === drawerState.content.fromTopic?.id
  );

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };
  return (
    <Drawer
      maskStyle={{ backgroundColor: "transparent" }}
      title={`Subscriber`}
      onClose={onClose}
      visible={drawerState.visible}
      bodyStyle={{
        marginBottom: "0px",
        paddingBottom: "0px",
      }}
      extra={<>{/* <Button onClick={() => handleSave()}> Save Changes </Button> */}</>}
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label={"Subscriber Node"}>
              <Link
                onClick={() => {
                  setDrawerState({
                    content: { id: toNode?.id },
                    type: "node",
                    visible: true,
                  });
                }}
              >
                {toNode?.label}
              </Link>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Published Topic"}>
              <Link
                onClick={() => {
                  setDrawerState({
                    content: { id: fromTopic?.id },
                    type: "topic",
                    visible: true,
                  });
                }}
              >
                {fromTopic?.label}
              </Link>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Subscriber rate" rules={[{ required: false }]}>
              <Row>
                <Col span={8}>
                  <InputNumber
                    min={0.001}
                    addonAfter={"Hz"}
                    style={{ margin: "0 0px" }}
                    value={subscriber?.rate}
                    onChange={(newValue: number) => {
                      subscriber!.rate = newValue;
                      setNodes([...nodes]);
                    }}
                  />
                </Col>
                <Col span={16}>
                  <Slider
                    min={0.001}
                    max={1}
                    step={0.001}
                    value={subscriber?.rate}
                    onChange={(newValue: number) => {
                      subscriber!.rate = newValue;

                      setNodes([...nodes]);
                    }}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description" rules={[{ required: false }]}>
              <Input.TextArea rows={4} placeholder="Optional description explaining the pub's function" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default DrawerSub;

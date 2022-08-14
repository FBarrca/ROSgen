import { CaretRightOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Typography, Drawer, Form, Row, Col, Input, Slider, InputNumber, Collapse, Select } from "antd";
import React, { useContext, useState } from "react";
import DrawerContext from "../../hooks/DrawerContext";

import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";

import { NodeProps, PublisherProps, TopicProps } from "../../interfaces/MainCanvas";
const { Text, Title, Link } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const DrawerPub: React.FC = (props) => {
  const { drawerState, setDrawerState } = useContext(DrawerContext);
  const { nodes, setNodes } = useContext(NodesContext);
  const { topics, setTopics } = useContext(TopicsContext);
  const onClose = () => {
    setDrawerState({ ...drawerState, visible: false });
  };

  const [inputValue, setInputValue] = useState(1);

  const fromNode: NodeProps | undefined = nodes.find((node) => node.id === drawerState.content.fromNode.id);
  const toTopic: TopicProps | undefined = topics.find((topic) => topic.id === drawerState.content.toTopic.id);
  const publisher: PublisherProps | undefined = fromNode?.publishers.find(
    (pub) => pub.topicID === drawerState.content.toTopic.id
  );

  const onChange = (newValue: number) => {
    setInputValue(newValue);
  };
  return (
    <Drawer
      maskStyle={{ backgroundColor: "transparent" }}
      title={`Publisher`}
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
            <Form.Item label={"Publisher Node"}>
              <Link
                onClick={() => {
                  setDrawerState({
                    content: { id: fromNode?.id },
                    type: "node",
                    visible: true,
                  });
                }}
              >
                {fromNode?.label}
              </Link>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Published Topic"}>
              <Link
                onClick={() => {
                  setDrawerState({
                    content: { id: toTopic?.id },
                    type: "topic",
                    visible: true,
                  });
                }}
              >
                {toTopic?.label}
              </Link>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Publisher rate" rules={[{ required: false }]}>
              <Row>
                <Col span={8}>
                  <InputNumber
                    min={0.001}
                    addonAfter={"Hz"}
                    style={{ margin: "0 0px" }}
                    value={publisher?.rate}
                    onChange={(newValue: number) => {
                      publisher!.rate = newValue;
                      setNodes([...nodes]);
                    }}
                  />
                </Col>
                <Col span={16}>
                  <Slider
                    min={0.001}
                    max={1}
                    step={0.001}
                    value={publisher?.rate}
                    onChange={(newValue: number) => {
                      publisher!.rate = newValue;

                      setNodes([...nodes]);
                    }}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        {/* <Title level={5}>QOS settings</Title> */}
        <Collapse bordered expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}>
          <Panel
            header={
              <Title level={5} style={{ margin: "0 0" }}>
                QOS settings
              </Title>
            }
            extra={
              <InfoCircleOutlined
                onClick={() => {
                  window.open(
                    "https://docs.ros.org/en/rolling/Concepts/About-Quality-of-Service-Settings.html",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              />
            }
            key="1"
          >
            {/* https://github.com/ros2/rmw/blob/8ea66dbbe89e78318cd2f2b4e7d8da51211d67bb/rmw/include/rmw/qos_profiles.h */}
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="History">
                  <Select defaultValue={publisher?.QOS.history} onChange={(value) => {}}>
                    <Option value="last">Keep last</Option>
                    <Option value="all">Keep all</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Depth">
                  Queue size:
                  <InputNumber
                    value={publisher?.QOS.depth}
                    addonAfter={"messages"}
                    style={{ width: 193.25, marginTop: -3, marginLeft: 15 }}
                  />
                </Form.Item>
                <Form.Item label="Reliability">
                  <Select defaultValue={publisher?.QOS.reliability}>
                    <Option value="best_effort">Best effort</Option>
                    <Option value="reliable">Reliable</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Durability">
                  <Select defaultValue={publisher?.QOS.durability}>
                    <Option value="transient_local">Transient local</Option>
                    <Option value="volatile">Volatile</Option>
                  </Select>
                </Form.Item>
                {/* <Form.Item label="Deadline">
                  <InputNumber min={1} addonAfter={"seconds"} style={{ width: 279 }} />
                </Form.Item> */}
              </Col>
            </Row>
          </Panel>
        </Collapse>

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
export default DrawerPub;

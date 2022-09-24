import { Button,Typography, Drawer, Form, Row, Col, Collapse, Cascader, Input } from "antd";
import React, { useContext } from "react";
import DrawerContext from "../../hooks/DrawerContext";
import { KonvaEventObject } from "konva/lib/Node";
import { TopicProps } from "../../interfaces/MainCanvas";


import messageTypes from "../../constants/messageTypes.json";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import NodesContext from "../../hooks/NodesContext";
import TopicsContext from "../../hooks/TopicsContext";
import { camelCase } from "../ExportCode/camelCase";

const { Text } = Typography;

const DrawerTopic: React.FC = (props) => {
  const { drawerState, setDrawerState } = useContext(DrawerContext);

  const onClose = () => {
    setDrawerState({ ...drawerState, visible: false });
  };
  const { nodes, setNodes } = useContext(NodesContext);
  const { topics, setTopics } = useContext(TopicsContext);
  const topic = topics.find((topic) => topic.id === drawerState.content.id);

  const handleTopicDelete = (topic: TopicProps) => {
    //Delete all connections to the topic
    // setNodes((prev) =>
    //   prev.map((n) => {
    //     n.publishers = n.publishers.filter((p) => p.topicID !== topic.id);
    //     n.subscribers = n.subscribers.filter((s) => s.topicID !== topic.id);
    //     return n;
    //   })
    // );
    // //Delete topic
    // setTopics((prev) => prev.filter((t) => t.id !== topic.id));
  }
  return (
    <Drawer
      maskStyle={{ backgroundColor: "transparent" }}
      title={`Topic: ${topic?.label}`}
      onClose={onClose}
      visible={drawerState.visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={<>{ <Button type="primary" icon={<DeleteOutlined />} onClick={(e) => handleTopicDelete(topic!)}> Delete </Button> }</>}
    >
      <Form
        layout="vertical"
        hideRequiredMark
        // onFinish={handleSave}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label={"Topic name"}
              rules={[{ required: true, message: "A name must be chosen for the topic" }]}
            >
              <Text
                editable={{
                  onChange: (e) => {
                    if (topic) {
                      topic.label = camelCase( e);
                      setTopics([...topics]);
                    }
                  },
                }}
              >
                {topic?.label}
              </Text>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="ID" rules={[{ required: true, message: "Please enter an id" }]}>
              {topic?.id}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Interface" rules={[{ required: true, message: "Please choose the type" }]}>
              <Collapse
                ghost
                expandIconPosition="end"
                expandIcon={() => <InfoCircleOutlined style={{ fontSize: "16px" }} />}
                style={{ marginBottom: "10px" }}
              >
                <Collapse.Panel
                  style={{ marginBottom: "0px" }}
                  key="1"
                  collapsible="header"
                  header=""
                  extra={
                    <Cascader
                      options={messageTypes}
                      allowClear={false}
                      placeholder="Please choose a message interface"
                      value={[topic!.type.class, topic!.type.type]}
                      style={{ width: "290px", marginLeft: "-5.7%", marginBottom: "-10px" }}
                      onChange={(value) => {
                        if (topic) {
                          topic.type = {
                            class: value[0].toString(),
                            type: value[1].toString(),
                          };
                          setTopics([...topics]);
                          console.log(topics.map((topic) => topic.type));
                        }
                      }}
                    />
                  }
                >
                  <Text style={{ whiteSpace: "pre-wrap", marginTop: 0 }}>
                    <pre style={{ marginTop: -10, marginLeft: -16.7 }}>
                      {
                        messageTypes
                          .find((type) => type.value === topic?.type.class)
                          ?.children.find((type) => type.value === topic?.type.type)?.description
                      }
                    </pre>
                  </Text>
                </Collapse.Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description" rules={[{ required: false }]}>
              <Input.TextArea rows={4} placeholder="Optional description explaining the topic" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};
export default DrawerTopic;

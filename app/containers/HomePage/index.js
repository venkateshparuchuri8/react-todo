import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Modal,
  Card,
  Upload,
  Button,
  Row,
  Col,
  List,
  Menu,
  Table,
  Tabs,
  Icon,
} from 'antd';

import { find, map, pick, forEach, without } from 'lodash';

const findLodash = (array, object) => find(array, object);
const mapLodash = (array, object) => map(array, object);
const withoutLodash = (array, values) => without(array, values);
const { TabPane } = Tabs;
const operations = <h1>Recipe Management</h1>;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deviceList: [],
      opnList: [],
      sgnList: [],
      selectedDevice: '',
      activeKey: '1',
      selectedRowKeys: [],
    };
    this.handleModal = this.handleModal.bind(this);
    this.getReceipes = this.getReceipes.bind(this);
    this.getDeviceData = this.getDeviceData.bind(this);
    this.handleTabCallback = this.handleTabCallback.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    this.getDeviceList();
  }

  getDeviceData(deviceName) {
    this.setState({
      showModal: true,
      selectedDevice: deviceName,
    });
    this.getReceipes(deviceName, 'opn');
  }

  getReceipes(deviceName, type) {
    const mocData = [
      {
        id: 563,
        name: 'Demo_1553284531600.opn',
        status: 'Draft',
        version: 'V1',
        author: 'merckservice',
        modifiedDate: 1576134122000,
        recipe: 'smart',
        deviceId: '3003',
        deviceUoPVersion: 'CCP04',
        deviceUoP: 'CCP',
        deviceSubFamily: 'Smart XMO',
        deviceFamily: 'smart',
        ccprecipelocation: 'Demo_1553284531600.opn',
        ccpProcedureId: '561',
      },
      {
        id: 564,
        name: 'Demo1_1553284531600.opn',
        status: 'Draft',
        version: 'V1',
        author: 'merckservice',
        modifiedDate: 1676134122055,
        recipe: 'smart',
        deviceId: '3003',
        deviceUoPVersion: 'CCP04',
        deviceUoP: 'CCP',
        deviceSubFamily: 'Smart XMO',
        deviceFamily: 'smart',
        ccprecipelocation: 'Demo1_1553284531600.opn',
        ccpProcedureId: '561',
      },
    ];
    this.setState({
      opnList: mocData,
      sgnList: mocData,
    });
    // const url = `https://localhost:8091/recipe/fetchByDevice/${deviceName}/receipetype/${type}`;
    // axios
    //   .get(url)
    //   .then(response => {
    //     console.log(response);
    //     if (type === 'opn') {
    //       this.setState({ opnList: response.data });
    //     } elseif (type === 'sgn) {
    //       this.setState({ sgnList: response.data });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  getDeviceList() {
    const mocData = [
      {
        id: 82,
        deviceID: '3003',
        ip: '10.2.235.607',
        version: 0,
        location: 'US',
        configuration: '{}',
        device_type: 'Chromatography',
        onboard: 'true',
        port: 8089,
        device_name: 'CCP',
      },
      {
        id: 84,
        deviceID: '3004',
        ip: '10.2.235.608',
        version: 0,
        location: 'US',
        configuration: '{}',
        device_type: 'TFF',
        onboard: 'true',
        port: 8089,
        device_name: 'CCP1',
      },
      {
        id: 85,
        deviceID: '3003',
        ip: '10.2.235.607',
        version: 0,
        location: 'US',
        configuration: '{}',
        device_type: 'Chromatography',
        onboard: 'true',
        port: 8089,
        device_name: 'CCP',
      },
      {
        id: 86,
        deviceID: '3004',
        ip: '10.2.235.608',
        version: 0,
        location: 'US',
        configuration: '{}',
        device_type: 'TFF',
        onboard: 'true',
        port: 8089,
        device_name: 'CCP1',
      },
      {
        id: 87,
        deviceID: '3003',
        ip: '10.2.235.607',
        version: 0,
        location: 'US',
        configuration: '{}',
        device_type: 'Chromatography',
        onboard: 'true',
        port: 8089,
        device_name: 'CCP',
      },
      {
        id: 88,
        deviceID: '3004',
        ip: '10.2.235.608',
        version: 0,
        location: 'US',
        configuration: '{}',
        device_type: 'TFF',
        onboard: 'true',
        port: 8089,
        device_name: 'CCP1',
      },
    ];
    this.setState({ deviceList: mocData });
    // const url = 'https://localhost:8089/api/discoverdDevices/';
    // axios
    //   .get(url)
    //     .then(response => {
    //     console.log(response);
    //     this.setState({ deviceList: response.data});
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
  }

  handleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
      activeKey: '1',
      selectedRowKeys: [],
    });
  }

  handleTabCallback(key) {
    const { selectedDevice } = this.state;
    this.setState({ activeKey: key });
    switch (key) {
      case '1':
        return this.getReceipes(selectedDevice, 'opn');
      case '2':
        return this.getReceipes(selectedDevice, 'sgn');

      default:
        return this.getReceipes(selectedDevice, 'opn');
    }
  }

  convertDate(timeStamp) {
    console.log('here comes.....1');
    const d = new Date(timeStamp);
    return `${d.getFullYear()}/${d.getMonth() +
      1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  renderNewModalContent() {
    const { opnList, sgnList, activeKey, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const Columns = [
      {
        title: 'Operations',
        dataIndex: 'name',
        key: 'name',
        width: 400,
      },
      {
        title: 'Device Name',
        dataIndex: 'deviceUoP',
        key: 'deviceUoP',
        width: 150,
      },
      {
        title: 'Device Type',
        dataIndex: 'deviceUoPVersion',
        key: 'deviceUoPVersion',
        width: 150,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 100,
      },
      {
        title: 'Modified',
        key: 'author',
        render: record => (
          <div>
            <span>{record.author}</span>
            <br />
            <span>{this.convertDate(record.modifiedDate)}</span>
          </div>
        ),
      },
    ];
    return (
      <div>
        <Tabs
          tabBarExtraContent={operations}
          onChange={this.handleTabCallback}
          activeKey={activeKey}
        >
          <TabPane tab="Unit Procedures" key="1">
            <Table
              columns={Columns}
              rowKey="id"
              dataSource={opnList}
              pagination={false}
              scroll={{ y: 240 }}
              rowSelection={rowSelection}
            />
          </TabPane>
          <TabPane tab="Operations" key="2">
            <Table
              columns={Columns}
              rowKey="id"
              dataSource={sgnList}
              pagination={false}
              scroll={{ y: 240 }}
              rowSelection={rowSelection}
            />
          </TabPane>
          <TabPane tab="Phases" key="3">
            Phases data comes here
          </TabPane>
        </Tabs>
      </div>
    );
  }

  renderDeviceHeader(title) {
    return (
      <div>
        <Icon
          type="android"
          size={100}
          style={{
            position: 'absolute',
            top: '13px',
            left: '2px',
            fontSize: '29px',
          }}
        />
        {title}
        <Icon
          type="ellipsis"
          onClick={() => this.getDeviceData(title, 'opn')}
          style={{
            position: 'absolute',
            top: '13px',
            right: '10px',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        />
      </div>
    );
  }

  render() {
    const { showModal, deviceList } = this.state;
    return (
      <div>
        <Modal
          title="Import Operations"
          visible={showModal}
          onOk={this.handleModal}
          onCancel={this.handleModal}
          className="upload-popup background-gray"
          width="1200px"
          footer={[
            <Button key="cancel" type="default" onClick={this.handleModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary">
              Import
            </Button>,
          ]}
        >
          {this.renderNewModalContent()}
        </Modal>
        {/* <Button type="default" onClick={() => this.handleModal()}>
            Open Here
          </Button> */}
        {/* <List
            header={<div>Device List</div>}
            bordered
            className="customList"
            dataSource={deviceList}
            renderItem={item => (
              <List.Item>
                {item.device_name}
                <Button
                  type="default"
                  onClick={() => this.getDeviceData(item.device_name, 'opn')}
                >
                  Get Receipes
                </Button>
              </List.Item>
            )}
          /> */}
        <div
          style={{
            background: '#ECECEC',
            padding: '30px',
            position: 'absolute',
            top: '0',
            left: '0',
            height: '100vh',
          }}
        >
          <Row gutter={16}>
            <Card
              title="Device List"
              style={{
                background: '#ECECEC',
              }}
            >
              {deviceList.length &&
                deviceList.map(item => (
                  <Col span={6} style={{ marginBottom: '20px' }} key={item.id}>
                    <Card
                      title={this.renderDeviceHeader(item.device_name)}
                      bordered={false}
                      style={{
                        height: '220px',
                        width: '250px',
                      }}
                    >
                      {/* <Button
                        type="default"
                        onClick={() =>
                          this.getDeviceData(item.device_name, 'opn')
                        }
                      >
                        Get Receipes
                      </Button> */}
                    </Card>
                  </Col>
                ))}
            </Card>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  {},
)(HomePage);

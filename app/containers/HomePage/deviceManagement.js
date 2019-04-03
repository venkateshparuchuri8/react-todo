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
const operations = <h1>Recipe Dispatch</h1>;

class DeviceManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      deviceList: [],
      opnList: [],
      sgnList: [],
      selectedDevice: '',
      deviceType: '',
      activeKey: '1',
      selectedRowKeys: [],
    };
    this.selectedRows = [];
    this.handleModal = this.handleModal.bind(this);
    this.getReceipes = this.getReceipes.bind(this);
    this.getDeviceData = this.getDeviceData.bind(this);
    this.handleTabCallback = this.handleTabCallback.bind(this);
    this.triggerImport = this.triggerImport.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    this.getDeviceList();
  }

  triggerImport() {
    const data = this.selectedRows;
    const { id, deviceId, author } = data[0];
    // const { selectedRows } = this.state;
    // const selectedReciepes = selectedRows;
    // const payload = [];
    // console.log('here selected receipes...', selectedReciepes);
    // for (let i = 0; i < selectedReciepes.length; i += 1) {
    //   const { id, deviceId, author } = selectedReciepes[i];
    //   payload.push({ id, deviceId, author });
    // }
    const payload = { id, deviceId, author };
    const url = 'http://localhost:8087/recipedispatcherapi/dispatch';
    axios
      .post(url, payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getDeviceData(deviceName, deviceType) {
    this.setState({
      showModal: true,
      selectedDevice: deviceName,
      deviceType,
    });
    this.getReceipes(deviceName, deviceType, 'pdr');
  }

  constructPayload(payload, type) {
    const dataArr = [];
    for (let i = 0; i < payload.length; i += 1) {
      const tempObj = payload[i];
      tempObj.deviceType = type;
      dataArr.push(tempObj);
    }
    return dataArr;
  }

  getReceipes(deviceName, deviceType, type) {
    const url = `https://localhost:8091/recipe/fetchByDevice/${deviceName}/receipetype/${type}`;
    axios
      .get(url)
      .then(response => {
        console.log(response);
        if (type === 'pdr') {
          const data = this.constructPayload(response.data, deviceType);
          this.setState({ opnList: data });
        } else if (type === 'opn') {
          const data = this.constructPayload(response.data, deviceType);
          this.setState({ sgnList: data });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  getDeviceList() {
    const url = 'https://localhost:8089/api/discoverdDevices/';
    axios
      .get(url)
      .then(response => {
        console.log(response);
        this.setState({ deviceList: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleModal() {
    const { showModal } = this.state;
    this.setState({
      showModal: !showModal,
      activeKey: '1',
      selectedRowKeys: [],
    });
    this.selectedRows = [];
  }

  handleTabCallback(key) {
    const { selectedDevice, deviceType } = this.state;
    this.selectedRows = [];
    this.setState({ activeKey: key, selectedRowKeys: [] });
    switch (key) {
      case '1':
        return this.getReceipes(selectedDevice, deviceType, 'pdr');
      case '2':
        return this.getReceipes(selectedDevice, deviceType, 'opn');

      default:
        return this.getReceipes(selectedDevice, deviceType, 'pdr');
    }
  }

  convertDate(timeStamp) {
    const d = new Date(timeStamp);
    const currentHours = `0${d.getHours()}`.slice(-2);
    const currentMinutes = `0${d.getMinutes()}`.slice(-2);
    const date = `${d.getFullYear()}/${d.getMonth() +
      1}/${d.getDate()} ${currentHours}:${currentMinutes}`;
    console.log('here date comes.....', date);
    return date;
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    const data = selectedRowKeys.slice(-1);
    const data1 = selectedRows.slice(-1);
    this.setState({ selectedRowKeys: data });
    this.selectedRows = data1;
  };

  renderNewModalContent() {
    const { opnList, sgnList, activeKey, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const UPColumns = [
      {
        title: 'Procedures',
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
        dataIndex: 'deviceType',
        key: 'deviceType',
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
    const OPColumns = [
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
        dataIndex: 'deviceType',
        key: 'deviceType',
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
              columns={UPColumns}
              rowKey="id"
              dataSource={opnList}
              pagination={false}
              scroll={{ y: 340 }}
              rowSelection={rowSelection}
            />
          </TabPane>
          <TabPane tab="Operations" key="2">
            <Table
              columns={OPColumns}
              rowKey="id"
              dataSource={sgnList}
              pagination={false}
              scroll={{ y: 340 }}
              rowSelection={rowSelection}
            />
          </TabPane>
          {/* <TabPane tab="Phases" key="3">
            Phases data comes here
          </TabPane> */}
        </Tabs>
      </div>
    );
  }

  renderDeviceHeader(title, deviceType) {
    return (
      <div>
        {/* <Icon
          type="android"
          size={100}
          style={{
            position: 'absolute',
            top: '13px',
            left: '2px',
            fontSize: '29px',
          }}
        /> */}
        {title}
        <Icon
          type="ellipsis"
          onClick={() => this.getDeviceData(title, deviceType, 'opn')}
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
            <Button key="submit" type="primary" onClick={this.triggerImport}>
              Dispatch
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
            width: '100%',
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
                      title={this.renderDeviceHeader(
                        item.device_name,
                        item.device_type,
                      )}
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
)(DeviceManagement);

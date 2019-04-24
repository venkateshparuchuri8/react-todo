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
  Input,
  Popover,
  Drawer,
  Checkbox,
} from 'antd';

import { find, map, pick, forEach, without } from 'lodash';
import Highlighter from 'react-highlight-words';

const findLodash = (array, object) => find(array, object);
const mapLodash = (array, object) => map(array, object);
const withoutLodash = (array, values) => without(array, values);
const { TabPane } = Tabs;
const { Search } = Input;
const deviceTypes = ['Bioreactor', 'Chromotography', 'TFF'];
const statusFilters = ['Draft', 'Tech Review', 'In Review', 'Archived'];
const operations = <h1>Recipe Dispatch</h1>;
const content = (
  <div>
    <div style={{ padding: '5px' }}>Most Recent</div>
    <div style={{ padding: '5px' }}>Alphabetical</div>
  </div>
);
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
    modifiedDate: 1576134122000,
    recipe: 'smart',
    deviceId: '3003',
    deviceUoPVersion: 'CCP04',
    deviceUoP: 'CCP',
    deviceSubFamily: 'Smart XMO',
    deviceFamily: 'smart',
    ccprecipelocation: 'Demo1_1553284531600.opn',
    ccpProcedureId: '561',
  },
  {
    id: 565,
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
    id: 566,
    name: 'Demo1_1553284531600.opn',
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
    ccprecipelocation: 'Demo1_1553284531600.opn',
    ccpProcedureId: '561',
  },
  {
    id: 567,
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
    id: 568,
    name: 'Demo1_1553284531600.opn',
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
    ccprecipelocation: 'Demo1_1553284531600.opn',
    ccpProcedureId: '561',
  },
  {
    id: 569,
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
    id: 570,
    name: 'Demo1_1553284531600.opn',
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
    ccprecipelocation: 'Demo1_1553284531600.opn',
    ccpProcedureId: '561',
  },
];
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
      showFilter: false,
    };
    this.selectedRows = [];
    this.handleModal = this.handleModal.bind(this);
    this.getReceipes = this.getReceipes.bind(this);
    this.getDeviceData = this.getDeviceData.bind(this);
    this.handleTabCallback = this.handleTabCallback.bind(this);
    this.triggerImport = this.triggerImport.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.triggerFilter = this.triggerFilter.bind(this);
    this.triggerDeviceList = this.triggerDeviceList.bind(this);
    this.triggerNext = this.triggerNext.bind(this);
  }

  componentWillMount() {
    // this.getDeviceList();
    this.getReceipes('pdr');
  }

  success(message) {
    Modal.success({
      title: message,
    });
  }

  error(message) {
    Modal.error({
      title: message,
    });
  }

  triggerImport() {
    const data = this.selectedRows;
    if (data.length) {
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
          this.success(response.description);
        })
        .catch(error => {
          console.log(error);
          this.error(error.description);
        });
    } else {
      this.error('please select receipe to proceed further');
    }
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

  getReceipes(type) {
    // const url = `https://localhost:8091/recipe/fetchByDevice/${deviceName}/receipetype/${type}`;
    // axios
    //   .get(url)
    //   .then(response => {
    //     console.log(response);
    //     if (type === 'pdr') {
    //       const data = this.constructPayload(response.data, deviceType);
    //       this.setState({ opnList: data });
    //     } else if (type === 'opn') {
    //       const data = this.constructPayload(response.data, deviceType);
    //       this.setState({ sgnList: data });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    this.setState({
      opnList: mocData,
      sgnList: mocData,
    });
  }

  triggerDeviceList() {
    this.setState({ deviceList: mocData, showModal: true });
  }

  triggerNext() {
    const data = this.selectedRows;
    console.log('here data...', data);
  }

  getDeviceList() {
    // const url = 'https://localhost:8089/api/discoverdDevices/';
    // axios
    //   .get(url)
    //   .then(response => {
    //     console.log(response);
    //     this.setState({ deviceList: response.data });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
    ];
    this.setState({ deviceList: mocData });
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

  triggerFilter() {
    const { showFilter } = this.state;
    this.setState({ showFilter: !showFilter });
  }

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
            <Row align="top" type="flex" gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Search
                  placeholder="input search text"
                  style={{ width: 200 }}
                />
                <Popover
                  placement="bottomRight"
                  content={content}
                  trigger="click"
                >
                  <Button icon="download" style={{ marginLeft: '10px' }} />
                </Popover>
                <Button
                  icon="filter"
                  onClick={this.triggerFilter}
                  style={{ marginLeft: '10px' }}
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                className="text-right"
              >
                <Button icon="download" style={{ marginLeft: '10px' }} />
                <Button
                  icon="plus"
                  onClick={this.triggerDeviceList}
                  style={{ marginLeft: '10px' }}
                />
                <Button icon="edit" style={{ marginLeft: '10px' }} />
              </Col>
            </Row>
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
        </Tabs>
      </div>
    );
  }

  renderDeviceHeader(title, deviceType) {
    return (
      <div>
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

  renderDeviceList() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <h2>Select Devices from the list below</h2>
        <Table
          columns={columns}
          dataSource={mocData}
          pagination={false}
          scroll={{ y: 340 }}
          rowSelection={rowSelection}
        />
      </div>
    );
  }

  renderFilterText() {
    return (
      <div>
        <Icon type="filter" theme="filled" style={{ color: 'blue' }} /> Filter
        By
      </div>
    );
  }

  render() {
    const { showModal, deviceList, showFilter } = this.state;
    return (
      <div>
        <Modal
          title="Import Operations"
          visible={showModal}
          onOk={this.handleModal}
          onCancel={this.handleModal}
          className="upload-popup background-gray"
          width="400px"
          footer={[
            <Button key="cancel" type="default" onClick={this.handleModal}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.triggerNext}>
              Next
            </Button>,
          ]}
        >
          {this.renderDeviceList()}
        </Modal>
        <Button type="default" onClick={() => this.handleModal()}>
          Open Here
        </Button>
        <Drawer
          title={this.renderFilterText()}
          placement="right"
          closable
          onClose={this.triggerFilter}
          visible={showFilter}
          maskClosable={false}
          width={350}
        >
          <h4>Device Type</h4>
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {deviceTypes.length &&
                deviceTypes.map(item => (
                  <Col span={24}>
                    <Checkbox value={item}>{item}</Checkbox>
                  </Col>
                ))}
            </Row>
          </Checkbox.Group>
          <h4>Status</h4>
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              {statusFilters.length &&
                statusFilters.map(item => (
                  <Col span={24}>
                    <Checkbox value={item}>{item}</Checkbox>
                  </Col>
                ))}
            </Row>
          </Checkbox.Group>
        </Drawer>
        <div className="upload-popup background-gray">
          {this.renderNewModalContent()}
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

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
import { initGetRecipeData } from '../../store/actions/RecipeManagementActions';

const findLodash = (array, object) => find(array, object);
const mapLodash = (array, object) => map(array, object);
const withoutLodash = (array, values) => without(array, values);
const { TabPane } = Tabs;
const operations = <h1>Recipe Management</h1>;
const { Search } = Input;
const deviceTypes = ['Bioreactor', 'Chromotography', 'TFF'];
const statusFilters = ['Draft', 'Tech Review', 'In Review', 'Archived'];
const content = (
  <div>
    <div style={{ padding: '5px' }}>Most Recent</div>
    <div style={{ padding: '5px' }}>Alphabetical</div>
  </div>
);

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
  }

  componentWillMount() {
    this.getReceipes('pdr');
  }

  //   triggerImport() {
  //     const data = this.selectedRows;
  //     if (data.length) {
  //       const { id, deviceId, author } = data[0];
  //       // const { selectedRows } = this.state;
  //       // const selectedReciepes = selectedRows;
  //       // const payload = [];
  //       // console.log('here selected receipes...', selectedReciepes);
  //       // for (let i = 0; i < selectedReciepes.length; i += 1) {
  //       //   const { id, deviceId, author } = selectedReciepes[i];
  //       //   payload.push({ id, deviceId, author });
  //       // }
  //       const payload = { id, deviceId, author };
  //       const url = 'https://localhost:8096/recipedispatcherapi/dispatch';
  //       axios
  //         .post(url, payload)
  //         .then(response => {
  //           console.log(response);
  //           this.success(response.description);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           this.error(error.description);
  //         });
  //     } else {
  //       this.error('please select a recipe to proceed further');
  //     }
  //   }
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
      const url = 'https://localhost:8096/recipedispatcherapi/dispatch';
      axios
        .post(url, payload)
        .then(response => {
          this.success(response && response.data && response.data.description);
        })
        .catch(error => {
          this.error(
            error &&
              error.response &&
              error.response.data &&
              error.response.data.description,
          );
        });
    } else {
      this.error('please select a recipe to proceed further');
    }
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
    const url = `https://localhost:8091/recipe/fetchByDevice/CCP/receipetype/${type}`;
    axios
      .get(url)
      .then(response => {
        if (type === 'pdr') {
          const data = this.constructPayload(response.data, type);
          this.setState({ opnList: data });
        } else if (type === 'opn') {
          const data = this.constructPayload(response.data, type);
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
                <Button icon="plus" style={{ marginLeft: '10px' }} />
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  getRecipeData: payload => dispatch(initGetRecipeData(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceManagement);

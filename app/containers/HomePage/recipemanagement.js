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
      operationFileList: [],
      signatureFileList: [],
      unitProcedure: [],
      signature: [],
      deviceName: '',
      showOprationalModal: false,
    };
    this.isFilePushed = false;
    this.thrownError = false;
    this.errorFiles = [];
    this.statelesskeys = {
      zaggle_card_client_id: '',
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
    this.handleOprationalModal = this.handleOprationalModal.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleProcedureImport = this.handleProcedureImport.bind(this);
    this.handleOperationalImport = this.handleOperationalImport.bind(this);
    this.handleChooseDevice = this.handleChooseDevice.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleOprationalModal() {
    const { showOprationalModal } = this.state;
    this.thrownError = false;
    this.isFilePushed = false;
    this.setState({
      showOprationalModal: !showOprationalModal,
      operationFileList: [],
      signatureFileList: [],
      unitProcedure: [],
      signature: [],
    });
  }

  apiFetchLoggedInUserDetails = payload => {
    const { deviceName } = this.state;
    const staticData = 'https://localhost:8091/recipe/uploadMultipleFiles';
    const url = `${staticData}/${deviceName}`;
    axios
      .post(url, payload)
      .then(response => {
        this.success(response && response.data && response.data.description);
      })
      .catch(error => {
        if (error.response == null) {
          this.error('Technical error. Please contact administrator');
        } else {
          this.error(
            error &&
              // error.response
              error.response.data &&
              error.response.data.description,
          );
          // alert(error.response);
        }
      });
  };

  objectToFormData = (obj, form, namespace) => {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          if (namespace === 'operations' || namespace === 'signatures') {
            formKey = namespace;
          } else {
            formKey = `${namespace}[${property}]`;
          }
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File, use recursivity.
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        } else if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File)
        ) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  };

  handleChooseDevice(deviceName) {
    this.setState({ deviceName, showOprationalModal: true });
  }

  handleClick() {
    console.log('here comes....handle click....');
  }

  validateFiles(_opns, _sgns, type) {
    const opns = mapLodash(_opns, 'name');
    const sgns = mapLodash(_sgns, 'name');
    const opns1 = opns.map(item => item.split('.')[0]);
    const sgns1 = sgns.map(item => item.split('.')[0]);
    const result =
      type === '.sgn'
        ? withoutLodash(opns1, ...sgns1)
        : withoutLodash(sgns1, ...opns1);
    const result1 = result.map(item => item.concat(type));
    // alert(`Please upload ${result1.join()} to proceed further`);
    this.error(`Please upload ${result1.join()} to proceed further`);
  }

  handleProcedureImport() {
    const {
      operationFileList,
      signatureFileList,
      unitProcedure,
      signature,
    } = this.state;
    const is_opn_sgn_valid =
      operationFileList.length === signatureFileList.length;
    const is_pdr_sgn_valid = unitProcedure.length === signature.length;
    if (unitProcedure.length) {
      if (signature.length) {
        if (operationFileList.length) {
          if (signatureFileList.length) {
            if (
              is_opn_sgn_valid &&
              is_pdr_sgn_valid &&
              operationFileList.length &&
              unitProcedure.length
            ) {
              const payload = {
                operations: [],
                signatures: [],
                procedure: unitProcedure[0].originFileObj,
                prdSignature: signature[0].originFileObj,
              };
              for (let i = 0; i < operationFileList.length; i += 1) {
                payload.operations.push(operationFileList[i].originFileObj);
              }
              for (let i = 0; i < signatureFileList.length; i += 1) {
                payload.signatures.push(signatureFileList[i].originFileObj);
              }
              const formData = this.objectToFormData(payload);
              this.apiFetchLoggedInUserDetails(formData);
            } else if (operationFileList.length > signatureFileList.length) {
              this.validateFiles(operationFileList, signatureFileList, '.sgn');
            } else {
              this.validateFiles(operationFileList, signatureFileList, '.opn');
            }
          } else {
            this.error('Upload Signature files to proceed further');
          }
        } else {
          this.error('Upload Operation files to proceed further');
        }
      } else {
        this.error('Upload signature file to proceed further');
      }
    } else {
      this.error('Upload unit procedure file to proceed further');
    }
  }

  handleOperationalImport() {
    const { operationFileList, signatureFileList } = this.state;
    const is_opn_sgn_valid =
      operationFileList.length === signatureFileList.length;
    if (operationFileList.length) {
      if (signatureFileList.length) {
        if (is_opn_sgn_valid) {
          const payload = {
            operations: [],
            signatures: [],
          };
          for (let i = 0; i < operationFileList.length; i += 1) {
            payload.operations.push(operationFileList[i].originFileObj);
          }
          for (let i = 0; i < signatureFileList.length; i += 1) {
            payload.signatures.push(signatureFileList[i].originFileObj);
          }
          const formData = this.objectToFormData(payload);
          this.apiFetchLoggedInUserDetails(formData);
          // this.props.apiFetchLoggedInUserDetails({ deviceName: this.state.deviceName, formData })
          // .then(() => {
          //   console.log(this.props);
          // });
        } else if (operationFileList.length > signatureFileList.length) {
          this.validateFiles(operationFileList, signatureFileList, '.sgn');
        } else {
          this.validateFiles(operationFileList, signatureFileList, '.opn');
        }
      } else {
        this.error('Upload signature files');
      }
    } else {
      this.error('Upload operation files');
    }
  }

  validateSgnFiles(fileList, file, actionStatus) {
    const { operationFileList, signatureFileList } = this.state;
    const namesList = signatureFileList.map(item => item.name);
    if (signatureFileList.length > fileList.length) {
      this.setState({
        [actionStatus]: fileList,
      });
    } else if (namesList.indexOf(file.name) === -1) {
      const arr = [];
      this.errorFiles = [];
      for (let i = 0; i < fileList.length; i += 1) {
        const fileName = fileList[i].name.split('.sgn');
        const result = findLodash(operationFileList, { name: fileName[0] });
        if (result) {
          arr.push(fileList[i]);
          this.isFilePushed = true;
        } else {
          this.errorFiles.push(fileName[0]);
          // this.error(`${fileName[0]} file missing`);
        }
      }
      const fileNameList = fileList.map(item => item.name);
      const fileNameIndex = fileNameList.indexOf(file.name);
      if (fileNameList.length - 1 === fileNameIndex) {
        if (this.isFilePushed) {
          this.error('Please select required signature files only');
        } else {
          const str = this.errorFiles.toString();
          this.error(`Upload ${str} files to proceed further`);
        }
      }
      this.setState({
        [actionStatus]: arr,
      });
    } else {
      const index = namesList.indexOf(file.name);
      const result = findLodash(fileList, { uid: file.uid });
      signatureFileList[index] = result;
      this.setState({ signatureFileList });
    }
  }

  validateInputSgnFile(fileList, actionStatus) {
    const { unitProcedure } = this.state;
    const fileName = fileList[0].name.split('.sgn');
    const result = findLodash(unitProcedure, { name: fileName[0] });
    if (result) {
      this.setState({
        [actionStatus]: fileList,
      });
    } else {
      this.error('Respective Signature file not found');
    }
  }

  validateDuplicateFile(fileList, file, actionFrom) {
    const { operationFileList } = this.state;
    const namesList = operationFileList.map(item => item.name);
    const fileName = file.name;
    if (operationFileList.length > fileList.length) {
      this.setState({
        [actionFrom]: fileList,
      });
    } else if (namesList.indexOf(fileName) === -1) {
      this.setState({
        [actionFrom]: fileList,
      });
    } else {
      const index = namesList.indexOf(fileName);
      const result = findLodash(fileList, { uid: file.uid });
      operationFileList[index] = result;
      this.setState({
        [actionFrom]: operationFileList,
      });
    }
  }

  validatecount() {
    console.log('comes here.....1');
  }

  handleFileUpload(actionFrom, { fileList, file }) {
    if (actionFrom === 'signatureFileList') {
      this.validateSgnFiles(fileList, file, actionFrom);
    } else if (actionFrom === 'signature') {
      this.validateInputSgnFile(fileList, actionFrom);
    } else if (actionFrom === 'unitProcedure') {
      this.setState({
        [actionFrom]: fileList,
      });
    } else {
      this.validateDuplicateFile(fileList, file, actionFrom);
    }
  }

  handleClear(actionFrom) {
    this.setState({
      [actionFrom]: [],
    });
  }

  renderUploadItem(item) {
    return (
      <div className="ant-upload-list-item ant-upload-list-item-undefined">
        <div className="ant-upload-list-item-info">
          <span>
            <span
              className="ant-upload-list-item-name"
              title="43401240_2184080018333916_1646186146226503680_o.jpg"
            >
              {item.name}
            </span>
            <i
              aria-label="icon: close"
              title="Remove file"
              tabIndex="-1"
              className="anticon anticon-close"
            />
          </span>
        </div>
      </div>
    );
  }

  renderFileList(actionFrom) {
    const { operationFileList, signatureFileList } = this.state;
    switch (actionFrom) {
      case 'operationFileList':
        return operationFileList;
      case 'signatureFileList':
        return signatureFileList;

      default:
        return [];
    }
  }

  renderUpload(
    actionFrom,
    props,
    { title, buttonClass } = { title: 'Choose File', buttonClass: 'uploads' },
  ) {
    return (
      <Upload
        {...props}
        key={actionFrom}
        onChange={params => this.handleFileUpload(actionFrom, params)}
        onClick={this.handleClick}
        fileList={this.renderFileList(actionFrom)}
      >
        <Button className={buttonClass}>{title}</Button>
      </Upload>
    );
  }

  renderProceduresTemplate() {
    const inputPropsCommon = {
      multiple: false,
      showUploadList: false,
      action: null,
      beforeUpload: () => false,
    };
    const bulkPropsCommon = {
      multiple: true,
      showUploadList: true,
      action: null,
      beforeUpload: () => false,
    };
    const { unitProcedure, signature, deviceName } = this.state;
    return (
      <div>
        <h2>Import CCP Unit Procedure for {deviceName}</h2>
        <p>
          You can import CCP operations recipes with respective to the procedure
          and signature files selected which were written in recipe editor.These
          files would be added to the central recipe repository
        </p>
        <Row align="middle" type="flex" gutter={6} className="margin-tb">
          <Col xs={24} sm={24} md={17} lg={17} xl={17}>
            <Input
              value={unitProcedure.length ? unitProcedure[0].name : ''}
              allowClear
              onChange={() => this.handleClear('unitProcedure')}
            />
          </Col>
          <Col xs={24} sm={24} md={7} lg={7} xl={7} className="text-right">
            {this.renderUpload(
              'unitProcedure',
              { ...inputPropsCommon, accept: '.pdr' },
              {
                title: 'Choose Unit Procedure',
                buttonClass: 'blue-btn',
              },
            )}
          </Col>
        </Row>

        <Row align="middle" type="flex" gutter={6} className="margin-tb">
          <Col xs={24} sm={24} md={17} lg={17} xl={17}>
            <Input
              value={signature.length ? signature[0].name : ''}
              allowClear
              onChange={() => this.handleClear('signature')}
            />
          </Col>
          <Col xs={24} sm={24} md={7} lg={7} xl={7} className="text-right">
            {this.renderUpload(
              'signature',
              { ...inputPropsCommon, accept: '.sgn' },
              {
                title: 'Choose Signature File',
                buttonClass: 'blue-btn',
              },
            )}
          </Col>
        </Row>
        <Row align="top" type="flex">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              title="Operation"
              extra={this.renderUpload('operationFileList', {
                ...bulkPropsCommon,
                accept: '.opn',
              })}
              className="noBorderRight"
            >
              {/* {operationFileList.length &&
                operationFileList.map(item =>
                  // <p key={item.name}>{item.name}</p>
                  this.renderUploadItem(item),
                )} */}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              title="Operation Signature File"
              extra={this.renderUpload('signatureFileList', {
                ...bulkPropsCommon,
                accept: '.sgn',
              })}
            >
              {/* {signatureFileList.length &&
                signatureFileList.map(item => (
                  <p key={item.name}>{item.name}</p>
                ))} */}
            </Card>
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="default"
            className="uploads"
            onClick={this.handleOprationalModal}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="blue-btn margin-left"
            onClick={this.handleProcedureImport}
          >
            Import
          </Button>
        </div>
      </div>
    );
  }

  renderOperationsTemplate() {
    const bulkPropsCommon = {
      multiple: true,
      showUploadList: true,
      action: null,
      beforeUpload: () => false,
    };
    const { unitProcedure, signature, deviceName } = this.state;
    return (
      <div>
        <h2>Import Operations for {deviceName}</h2>
        <p>
          You can import operations recipes written in recipe editor by
          specifying the files. These files would be added to the central recipe
          repository
        </p>

        <Row align="top" type="flex">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              title="Operation"
              extra={this.renderUpload('operationFileList', {
                ...bulkPropsCommon,
                accept: '.opn',
              })}
              className="noBorderRight"
            >
              {/* {operationFileList.length &&
                operationFileList.map(item =>
                  // <p key={item.name}>{item.name}</p>
                  this.renderUploadItem(item),
                )} */}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card
              title="Signature File"
              extra={this.renderUpload('signatureFileList', {
                ...bulkPropsCommon,
                accept: '.sgn',
              })}
            >
              {/* {signatureFileList.length &&
                signatureFileList.map(item => (
                  <p key={item.name}>{item.name}</p>
                ))} */}
            </Card>
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Button
            type="default"
            className="uploads"
            onClick={this.handleOprationalModal}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="blue-btn margin-left"
            onClick={this.handleOperationalImport}
          >
            Import
          </Button>
        </div>
      </div>
    );
  }

  renderModalContent() {
    return (
      <Tabs defaultActiveKey="operations">
        <TabPane tab="Operations" key="operations">
          {this.renderOperationsTemplate()}
        </TabPane>
        <TabPane tab="Procedures" key="procedures">
          {this.renderProceduresTemplate()}
        </TabPane>
      </Tabs>
    );
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
    const url = `https://localhost:8091/recipe/fetchByDevice/CCP/receipetype/${type}`;
    // url: https://10.2.232.184:8134/metadatas/device_uop_ver/XMO4
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

  triggerDeviceList() {
    const url = 'https://localhost:8089/api/discoverdDevices/';
    axios
      .get(url)
      .then(response => {
        this.setState({ deviceList: response.data, showModal: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  triggerNext() {
    const data = this.selectedRows;
    console.log('here data...', data);
    this.setState({ showModal: false, showOprationalModal: true });
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
        dataIndex: 'device_name',
        key: 'device_name',
      },
    ];
    const { selectedRowKeys, deviceList } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <div>
        <h2>Select Devices from the list below</h2>
        <Table
          columns={columns}
          dataSource={deviceList}
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
    const {
      showModal,
      deviceList,
      showFilter,
      showOprationalModal,
    } = this.state;
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
        <Modal
          title="Import Operations"
          visible={showOprationalModal}
          footer={null}
          onOk={this.handleOprationalModal}
          onCancel={this.handleOprationalModal}
          className="upload-popup"
          width="750px"
        >
          {this.renderModalContent()}
        </Modal>
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

/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import {
  Modal,
  Card,
  Upload,
  Button,
  Row,
  Input,
  Col,
  List,
  Menu,
  Icon,
  Table,
} from 'antd';
import { find, map, pick, forEach, without } from 'lodash';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const findLodash = (array, object) => find(array, object);
const mapLodash = (array, object) => map(array, object);
const withoutLodash = (array, values) => without(array, values);

const { SubMenu } = Menu;
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      operationFileList: [],
      signatureFileList: [],
      unitProcedure: [],
      signature: [],
      deviceName: '',
    };
    this.statelesskeys = {
      zaggle_card_client_id: '',
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleImport = this.handleImport.bind(this);
    this.handleChooseDevice = this.handleChooseDevice.bind(this);
  }

  handleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  handleChooseDevice(deviceName) {
    this.setState({ deviceName, showModal: true });
  }

  validateSgnFiles(fileList, actionStatus) {
    const { operationFileList } = this.state;
    const arr = [];
    for (let i = 0; i < fileList.length; i += 1) {
      const fileName = fileList[i].name.split('.sgn');
      const result = findLodash(operationFileList, { name: fileName[0] });
      if (result) {
        arr.push(fileList[i]);
      } else {
        alert('respective Signature file not found');
      }
    }
    this.setState({
      [actionStatus]: arr,
    });
  }

  objectToFormData = (obj, form, namespace) => {
    const fd = form || new FormData();
    let formKey;

    for (const property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = `${namespace}[${property}]`;
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

  validateInputSgnFile(fileList, actionStatus) {
    const { unitProcedure } = this.state;
    const fileName = fileList[0].name.split('.sgn');
    const result = findLodash(unitProcedure, { name: fileName[0] });
    if (result) {
      this.setState({
        [actionStatus]: fileList,
      });
    } else {
      alert('respective operation file not found');
    }
  }

  handleFileUpload(actionFrom, { fileList }) {
    if (actionFrom === 'signatureFileList') {
      this.validateSgnFiles(fileList, actionFrom);
    } else if (actionFrom === 'signature') {
      this.validateInputSgnFile(fileList, actionFrom);
    } else {
      this.setState({
        [actionFrom]: fileList,
      });
    }
  }

  handleClear(actionFrom) {
    console.log('here coems.....', actionFrom);
    this.setState({
      [actionFrom]: [],
    });
  }

  apiFetchLoggedInUserDetails = payload => {
    axios
      .post('https://localhost:8089/recipe/uploadfile', payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
    alert(`${result1.join()} files missing`);
  }

  handleImport() {
    const { operationFileList, signatureFileList, deviceName } = this.state;
    const is_opn_sgn_valid =
      operationFileList.length === signatureFileList.length;
    if (is_opn_sgn_valid) {
      // alert('validation success......');
      const payload = {
        // recipe_payload,
        deviceName,
        operations: [],
        signatures: [],
      };
      //   payload.recipe_payload.recipe_name = deviceName;
      for (let i = 0; i < operationFileList.length; i += 1) {
        const data = {
          fileName: operationFileList[i].name,
          fileData: operationFileList[i].originFileObj,
        };
        payload.operations.push(data);
      }
      for (let i = 0; i < signatureFileList.length; i += 1) {
        const data = {
          fileName: signatureFileList[i].name,
          fileData: signatureFileList[i].originFileObj,
        };
        payload.signatures.push(data);
      }
      const formData = this.objectToFormData({ payload });
      console.log('here form data....', formData);
      this.apiFetchLoggedInUserDetails(formData);
    } else if (operationFileList.length > signatureFileList.length) {
      this.validateFiles(operationFileList, signatureFileList, '.sgn');
    } else {
      this.validateFiles(operationFileList, signatureFileList, '.opn');
    }
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
        fileList={this.renderFileList(actionFrom)}
      >
        <Button className={buttonClass}>{title}</Button>
      </Upload>
    );
  }

  renderModalContent() {
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
          <Button type="default" className="uploads" onClick={this.handleModal}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="blue-btn margin-left"
            onClick={this.handleImport}
          >
            Import
          </Button>
        </div>
      </div>
    );
  }

  renderNewModalContent() {
    return (
      <div>
        <Row align="top" type="flex" gutter={16}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <Menu
              mode="inline"
              // openKeys={this.state.openKeys}
              // onOpenChange={this.onOpenChange}
              // style={{ width: 256 }}
            >
              <SubMenu key="sub1" title={<span>Navigation One</span>}>
                <Menu.Item key="1">Option 1</Menu.Item>
                <Menu.Item key="2">Option 2</Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span>Navigation Two</span>}>
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" title={<span>Navigation Three</span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Table
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
            />
            ,
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { showModal } = this.state;
    const data = ['TF2S', 'TF3S', 'XMO3', 'XMO12'];
    return (
      <div>
        <div>
          <Button type="default" onClick={() => this.handleModal()}>
            Open Here
          </Button>
          {/* <List
            header={<div>Device List</div>}
            bordered
            className="customList"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                {item}
                <Button
                  type="default"
                  onClick={() => this.handleChooseDevice(item)}
                >
                  Choose Files
                </Button>
              </List.Item>
            )}
          /> */}
          <Modal
            title="Import Operations"
            visible={showModal}
            footer={null}
            onOk={this.handleModal}
            onCancel={this.handleModal}
            className="upload-popup"
            width="750px"
          >
            {this.renderNewModalContent()}
          </Modal>
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

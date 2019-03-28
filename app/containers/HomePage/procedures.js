import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Card, Upload, Button, Row, Input, Col, List } from 'antd';
import { find, map, without } from 'lodash';

const findLodash = (array, object) => find(array, object);
const mapLodash = (array, object) => map(array, object);
const withoutLodash = (array, values) => without(array, values);

export class Procedures extends Component {
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

  apiFetchLoggedInUserDetails = payload => {
    const { deviceName } = this.state;
    const staticData = 'https://localhost:8089/recipe/uploadMultipleFiles';
    const url = `${staticData}/${deviceName}`;
    axios
      .post(url, payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
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
    this.setState({ deviceName, showModal: true });
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
    alert(`Please upload ${result1.join()} to proceed further`);
  }

  handleImport() {
    const {
      operationFileList,
      signatureFileList,
      unitProcedure,
      signature,
    } = this.state;
    const is_opn_sgn_valid =
      operationFileList.length === signatureFileList.length;
    const is_pdr_sgn_valid = unitProcedure.length === signature.length;
    if (is_opn_sgn_valid && is_pdr_sgn_valid) {
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

  validateInputSgnFile(fileList, actionStatus) {
    const { unitProcedure } = this.state;
    const fileName = fileList[0].name.split('.sgn');
    const result = findLodash(unitProcedure, { name: fileName[0] });
    if (result) {
      this.setState({
        [actionStatus]: fileList,
      });
    } else {
      alert('respective Signature file not found');
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

  render() {
    const { showModal } = this.state;
    const data = ['TF2S', 'TF3S', 'XMO3', 'XMO12'];
    return (
      <div>
        <div>
          {/* <Button type="primary" onClick={this.handleModal}>
            Open Modal
          </Button> */}
          <List
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
          />
          <Modal
            title="Import Operations"
            visible={showModal}
            footer={null}
            onOk={this.handleModal}
            onCancel={this.handleModal}
            className="upload-popup"
            width="750px"
          >
            {this.renderModalContent()}
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
)(Procedures);

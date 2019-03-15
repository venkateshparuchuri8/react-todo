/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
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
import { Modal, Card, Upload, Button, Row, Input, Col } from 'antd';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
    };
    this.statelesskeys = {
      zaggle_card_client_id: '',
    };
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  renderUpload() {
    const props = {
      // onChange: this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props}>
        <Button className="uploads">Choose File</Button>
      </Upload>
    );
  }

  renderModalContent() {
    return (
      <div>
        <p>Some static content</p>
        <Row align="middle" type="flex" gutter={6} className="margin-tb">
          <Col xs={24} sm={24} md={17} lg={17} xl={17}>
            <Input />
          </Col>
          <Col xs={24} sm={24} md={7} lg={7} xl={7} className="text-right">
            <Upload>
              <Button className="blue-btn">Choose Unit Procedure</Button>
            </Upload>
          </Col>
        </Row>

        <Row align="middle" type="flex" gutter={6} className="margin-tb">
          <Col xs={24} sm={24} md={17} lg={17} xl={17}>
            <Input />
          </Col>
          <Col xs={24} sm={24} md={7} lg={7} xl={7} className="text-right">
            <Upload>
              <Button className="blue-btn">Choose Signature file</Button>
            </Upload>
          </Col>
        </Row>
        <Row align="middle" type="flex">
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Operation" extra={this.renderUpload()} className="noBorderRight" />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Card title="Signature File" extra={this.renderUpload()} />
          </Col>
        </Row>
        <div style={{ textAlign: 'right' }}>
          <Button type="default" className="uploads">Cancel</Button>
          <Button type="primary" className="blue-btn margin-left">Import</Button>
        </div>
      </div>
    );
  }

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.handleModal}>
            Open Modal
          </Button>
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

HomePage.propTypes = {};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);

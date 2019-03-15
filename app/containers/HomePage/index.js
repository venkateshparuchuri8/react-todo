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
import { Modal, Card, Upload, Button, Icon, Input } from 'antd';
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
        <Button>Choose File</Button>
      </Upload>
    );
  }

  renderModalContent() {
    return (
      <div>
        <p>Some static content</p>
        <Input />
        <Upload>
          <Button>Choose Unit Procedure</Button>
        </Upload>
        <Input />
        <Upload>
          <Button>Choose Signature file</Button>
        </Upload>
        <Card title="Operation" extra={this.renderUpload()} />
        <Card title="Signature File" extra={this.renderUpload()} />
        <Button type="default">Cancel</Button>
        <Button type="primary">Import</Button>
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

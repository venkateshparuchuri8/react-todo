/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
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
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix';
// import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

import Modal from '../../components/Modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
/* eslint-disable react/prefer-stateless-function */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
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

  renderModalBody() {
    return (
      <div className="model-content">
        <h2>sdasd</h2>
        <p>sdasdasd sds adas das das dasd </p>
        <div className="top">
          <Input type="text" />
          <Button type="submit">Choose unit procedure</Button>
        </div>
        <div className="box">
          <div className="header">
            <strong>operations</strong>
            <Input type="file" />
          </div>
          <span>
            one
            <p className="close" /> <br />
            one <br />
            one <br />
            one <br />
            one <br />
          </span>
        </div>
        <div className="box noborder-left">
          <div className="header">
            <strong>operations</strong>
            <Input type="file" />
          </div>
          <span>
            one <br />
            one <br />
            one <br />
            one <br />
            one <br />
            one <br />
            one <br />
            one <br />
            one <br />
            one <br />
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { showModal } = this.state;
    return (
      <div>
        <Modal
          show={showModal}
          header="Update Details"
          onClose={this.handleModal}
          size="md"
        >
          {this.renderModalBody()}
        </Modal>
        <Button type="primary" onClick={this.handleModal}>
          open Modal
        </Button>
      </div>
    );
  }
}

HomePage.propTypes = {
  onSubmitForm: PropTypes.func,
};

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

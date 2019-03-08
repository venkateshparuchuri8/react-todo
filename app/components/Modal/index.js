import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from './ModalWrapper';
import ModalDialog from './ModalDialog';
import ModalContent from './ModalContent';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

class Modal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  renderHeader(header, showClose, onClose) {
    if (header || showClose) {
      return (
        <ModalHeader>
          {typeof header === 'string' ?
            <h5>{header}</h5>
            :
            header
          }
          <button onClick={onClose} />
        </ModalHeader>
      );
    }
    return '';
  }

  renderFooter(footer) {
    if (footer) {
      return (
        <ModalFooter>
          {footer}
        </ModalFooter>
      );
    }
    return '';
  }

  render() {
    const { show, header, children, showClose, footer, size, onClose, classname } = this.props;
    return (
      <ModalWrapper
        show={show}
      >
        <ModalDialog
          size={size}
        >
          <ModalContent
            className={classname}
          >
            {this.renderHeader(header, showClose, onClose)}
            <ModalBody>
              {children}
            </ModalBody>
            {this.renderFooter(footer)}
          </ModalContent>
        </ModalDialog>
      </ModalWrapper>
    );
  }
}

Modal.defaultProps = {
  show: false,
  header: '',
  showClose: true,
  size: 'md',
  classname: '',
  onClose: () => '',
};

Modal.propTypes = {
  show: PropTypes.bool,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.node,
  showClose: PropTypes.bool,
  footer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  size: PropTypes.oneOf([
    'sm', 'md', 'lg', 'xl', 'login', 'null',
  ]),
  onClose: PropTypes.func,
  classname: PropTypes.string,
};

export default Modal;

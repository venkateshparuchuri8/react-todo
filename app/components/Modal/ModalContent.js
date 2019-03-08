import styled from 'styled-components';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import Input from '../Input';
import Button from '../Button';

const ModalContent = styled.div`
  position: relative;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: 0;
  &.default {
    background: #fff;
    ${ModalHeader} {
      padding: 0px;
      h5 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        // width: 100%;
        top: 35px;
        font-size: 19px;
      }
      button {
        position: absolute;
        z-index: 9;
        right: 15px;
        top: 15px;
        border-radius: 50%;
        color: #5d5d5d;
      }
    }
    ${ModalBody} {
      .formElement {
        padding: 30px 30px 0px 30px;
        margin-top: 40px;
        ${Input} {
          width: 100%;
          margin-bottom: 20px;
        }
        textarea {
          width: 100%;
          height: 75px;
        }
      }
      .common {
        padding: 10px;
        text-align: center;
        margin: 0;
        form {
          margin-top: 20px;
        }
      }
    }
    ${ModalFooter} {
      padding: 0px 30px 30px 30px;
      button {
        background: ${props => props.theme.primaryColor};
        color: #fff;
      }
    }
  }
  &.videoPopup {
    ${ModalBody} {
      padding: 0px;
      background: transparent;
      iframe {
        min-height: 500px;
      }
    }
    ${ModalHeader} {
      padding: 0px;
      h5 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        // width: 100%;
        top: 35px;
        font-size: 19px;
      }
      button {
        position: absolute;
        z-index: 9;
        right: -15px;
        top: -15px;
        border-radius: 50%;
        color: #5d5d5d;
        background: #fff;
      }
    }
  }
  &.without-header {
    background: #fff;
    ${ModalHeader} {
      padding: 0px;
      h5 {
        display: none;
      }
      button {
        position: absolute;
        z-index: 9;
        right: 15px;
        top: 15px;
        border-radius: 50%;
        // background:#fff;
        color: #5d5d5d;
      }
    }
    ${ModalBody} {
    }
    ${ModalFooter} {
    }
  }
`;

export default ModalContent;

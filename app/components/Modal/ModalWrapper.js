import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  overflow: hidden;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: ${({ show }) => show ? '15px' : '0px'};
  padding-left: ${({ show }) => show ? '15px' : '0px'};
  background-color: rgba(0, 0, 0, .50);
  opacity: ${({ show }) => show ? 1 : 0};
  transition: opacity 0.2s ease-in;
  height: ${({ show }) => show ? 'auto' : 0};
`;

export default ModalWrapper;

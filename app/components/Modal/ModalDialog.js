import styled from 'styled-components';

const ModalDialog = styled.div`
  position: relative;
  width: auto;
  margin: .5rem auto;
  margin-top: 3rem;
  pointer-events: none;
  transition: transform .3s ease-out,-webkit-transform .3s ease-out;
  transform: translate(0,0);
  box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
  max-width: ${({ size }) => {
    if (size === 'sm') {
      return '500px';
    } if (size === 'md') {
      return '700px';
    } if (size === 'login') {
      return '420px';
    } if (size === 'lg') {
      return '900px';
    } if (size === 'xl') {
      return '100%';
    }
    return '500px';
  }}
`;

export default ModalDialog;

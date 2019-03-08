import styled from 'styled-components';

const ModalHeader = styled.div`
  display: flex;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem;
  h5 {
    font-size: 30px;
    display: inline-block;
    margin: 0;
    text-transform: capitalize;
  }
  button {
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: .7em;
    transform: rotate(45deg);
    width: 30px;
    height: 30px;
    margin: 2px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    font-style: normal;
    color: #000000;
    text-align: left;
    text-indent: -9999px;
    direction: ltr;
    transition: all .2s;
    right: 0;
    & :focus {
      outline: none;
    }
    ::before {
      content: '';
      width: 20px;
      height: 2px;
      box-shadow: inset 0 0 0 32px;
      transform: translate(-50%,-50%);
      position: absolute;
      left: 50%;
      top: 50%;
    }
    ::after {
      content: '';
      height: 20px;
      width: 2px;
      box-shadow: inset 0 0 0 32px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
`;

export default ModalHeader;

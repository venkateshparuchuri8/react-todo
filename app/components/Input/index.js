import styled, { css } from 'styled-components';

const Input = styled.input`
  margin: 0;
  max-width: 100%;
  -webkit-box-flex: 1;
  -ms-flex: 1 0 auto;
  flex: 1 0 auto;
  outline: 0;
  -webkit-tap-highlight-color: rgba(255,255,255,0);
  text-align: left;
  line-height: 1.21428571em;
  padding: .67857143em 1em;
  background: transparent;
  border:none;
  border-bottom: 1px solid rgba(34,36,38,.15);
  color: rgba(0,0,0,.87);
  -webkit-transition: box-shadow .1s ease,border-color .1s ease;
  transition: box-shadow .1s ease,border-color .1s ease;
  box-shadow: none;
  & :focus {
    border-color: #85b7d9;
    background: #fff;
    color: rgba(0,0,0,.8);
    box-shadow: none;
  }
  ${({ fluid }) => fluid && css`
    width: auto;
  `}
  ${({ border }) => {
    if (border === 'border') {
      return css`
        border: 1px solid rgba(34,36,38,.15) !important;
      `;
    }
    if (border === 'noBorder') {
      return css`
        background-color: ${(props) => props.theme.secondaryColor};
        color: #fff;
      `;
    }
    return '';
  }}
`;
Input.displayName = 'input';
export default Input;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
 .ReactModal__Content{
   width:50%;
   @media (max-width: 768px) {
        width:100%;
      };
 }
  .model-content{
    .close {
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
    .top{
      padding:20px 0px;
      input[type="text"]{
        width:60%;
        border:#ccc solid 1px;
        padding:10px;
        @media (max-width: 768px) {
        width:100%;
      };
      }
      button{
        width: 39%;
        margin-left: 1%;
        border:#ccc solid 1px;
        padding:10px;
        border-radius:5px;
        @media (max-width: 768px) {
        width:100%;
        margin-left:0;
        margin-top:10px;
      };
      }
    }
    .box{
      border:1px solid #ccc;
      width:50%;
      display:inline-block;
      @media (max-width: 768px) {
        width:100%;
      };
      &.noborder-left{
        border-left:0px !important;
        @media (max-width: 768px) {
          border-left:1px solid #ccc !important;
        };
      }
      .header{
        background:#ddd;
        border-bottom:1px solid #ccc;
        padding:20px;
        display: block;
        min-height: 60px;
        label{
          padding: 3px 10px;
          background: #fff;
          float: right;
          color: #333;
          font-size: 12px;
          border-radius: 5px;
          font-family: sans-serif;
          input[type="file"] {
          display: none;
          }
        }
        strong{
          float:left;
          font-weight:normal;
        }
        input{
          float: right;
          width: 50%;
        }
      }
      span{
        padding:20px;
        display:block;
        width:100%;
        overflow: scroll;
        height: 200px;
      }
    }
    a{
      text-decoration:none;
    }
    .btn-blue{
      color: #fff;
      background-color: #007bff;
      border-color: #007bff;
      padding:10px 20px;
      float:right;
      border-radius:5px;
    }
   }
`;

export default GlobalStyle;

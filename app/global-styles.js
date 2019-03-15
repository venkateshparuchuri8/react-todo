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

  .ant-upload-list{
    &.ant-upload-list-text{
      position: absolute;
      left: 10px;
      margin-top: 30px;
      width: 99%;
      padding-right:10px;
      height: 170px;
      overflow: auto;
    }
  }

  .anticon{
    &.anticon-paper-clip {
      display: none
    }
  } 
  .ant-upload-list-item-name {
    padding: 0px;
    &:hover{
      background-color:transparent;
    }
  }
  .ant-upload-list-item:hover .ant-upload-list-item-info{
    background-color:transparent;
  }
.text-right{
  text-align:right;
}
  .upload-popup{
    h2{
      font-weight:bold;
    }
    .margin-tb{
      margin:20px 0px;
    }
    .ant-modal-header{
      display:none;
    }
    .ant-modal-close{
      display:none;
    }
    .margin-left{
      margin-left:20px;
    }
    .noBorderRight{
      border-right:0px;
    }
    input{
      background:#f8f7fc;
      border-color:#c4c5c7;
      &:hover{
        border-color: #c4c5c7;
      }
      &:focus{
        border-color: #c4c5c7;
        border-right-width: 1px !important;
        outline: 0;
        box-shadow: none;
      }
    }
    .uploads{
      background:#f8f7fc;
      color: #572d95;
      font-weight:bold;
      border-color:#c4c5c7;
    }
    .blue-btn{
      background:#572d95;
      color: #fff;
      font-weight:500;
      border-color:#c4c5c7;
    }
    .ant-card{
      border-radius:0px;
      margin-bottom:20px;
    }
    .ant-card-head{
      background:#f8f8f8;
    }
    .ant-card-body{
      height:200px;
      overflow:scroll;
    }
    .ant-card-head-title{
      color: #525252;
    font-weight: 600;
    }
  }
`;

export default GlobalStyle;

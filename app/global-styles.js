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
    background-color: #e9e8ec;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  
  .upload-popup{
    &.background-gray{
      .ant-tabs{
        .ant-tabs-bar{
          padding-bottom:15px;
          border-bottom: 1px solid #ccc;
        }
        .ant-tabs-extra-content{
          float:left !important;
          h1{
            font-size:20px;
          }
        }
        .ant-tabs-nav-scroll{
          float:right;
          .ant-tabs-nav{
            .ant-tabs-ink-bar{
              background-color:#a4a3ab;
            }
            .ant-tabs-tab{
              font-size:12px;
              margin:0px;
              padding:12px;
              &.ant-tabs-tab-active{
              color:#a4a3ab;
              font-weight:bold;
            }
            }
          }
        }
      }
      .ant-modal-body{
        background:#e9e8ed;
        padding-bottom:0px;
      }
      .ant-modal-footer{
        background:#e9e8ed;
      }
      .ant-table-fixed-header{
        .ant-table-scroll{
          .ant-table-header{
          .ant-table-thead > tr > th{
            background: #e9e8ec;
          }
        }
        .ant-table-body{
        .ant-table-thead{
          tr{
            th{
              background:transparent;
              border-bottom:0px;
            }
          }
        }
        .ant-table-tbody{
          .ant-table-row{
            background:#fff;
            td{
              border-bottom: 8px solid #e9e8ed;
              &:first-child{
                border-radius:10px 0px 0px 10px;
              }
              &:last-child{
                border-radius:0px 10px 10px 0px;
              }
            }
          }
        }
      }
      }
      }
      .ant-table-selection {
      visibility: hidden;
    }
    .ant-checkbox-inner {
          border-radius: 50px;
    outline: none;
    }
      
    }

    &.background-lightgray{
      .ant-tabs{
        .ant-tabs-bar{
          padding-bottom:15px;
          border-bottom: 1px solid #ccc;
        }
        .ant-tabs-extra-content{
          float:left !important;
          h1{
            font-size:20px;
          }
        }
        .ant-tabs-nav-scroll{
          float:right;
          .ant-tabs-nav{
            .ant-tabs-ink-bar{
              background-color:#a4a3ab;
            }
            .ant-tabs-tab{
              font-size:12px;
              margin:0px;
              padding:12px;
              &.ant-tabs-tab-active{
              color:#a4a3ab;
              font-weight:bold;
            }
            }
          }
        }
      }
      .ant-modal-body{
        background:#e9e8ed;
        padding-bottom:0px;
      }
      .ant-modal-footer{
        background:#e9e8ed;
      }
      .ant-table-fixed-header{
        margin-top:20px;
        .ant-table-scroll{
        .ant-table-body{
        .ant-table-thead{
          tr{
            th{
              background:transparent;
              border-bottom:0px;
            }
          }
        }
        .ant-table-tbody{
          .ant-table-row{
            background:#fff;
            td{
              border-bottom: 8px solid #e9e8ed;
              &:first-child{
                border-radius:10px 0px 0px 10px;
              }
              &:last-child{
                border-radius:0px 10px 10px 0px;
              }
            }
          }
        }
      }
      }
      }
      .ant-table-selection {
      visibility: hidden;
    }
    .ant-checkbox-inner {
          border-radius: 50px;
    outline: none;
    }
      
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

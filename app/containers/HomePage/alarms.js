import './AlarmFunctions.css';
import { connect } from 'react-redux';
import React from 'react';
import { Button } from 'antd';
// import { searchAlarms } from '../../services/SearchAlarmService';
import ActionConstants from '../../utils/ActionConstants';
import { updateAlarmList } from '../../actions/UpdateAlarmActions';

class AlarmFunctions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.sortByNameAsc = this.sortByNameAsc.bind(this);
    this.sortByNameDesc = this.sortByNameDesc.bind(this);
    this.sortByTypeAsc = this.sortByTypeAsc.bind(this);
    this.sortByTypeDesc = this.sortByTypeDesc.bind(this);
    this.sortByDeviceAsc = this.sortByDeviceAsc.bind(this);
    this.sortByDeviceDesc = this.sortByDeviceDesc.bind(this);
    this.sortByDateAsc = this.sortByDateAsc.bind(this);
    this.sortByDateDesc = this.sortByDateDesc.bind(this);
    this.sortByAckAsc = this.sortByAckAsc.bind(this);
    this.sortByAckDesc = this.sortByAckDesc.bind(this);
  }

  /**
   * @param {*} e
   */
  handleSearch(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.filter((alarm) => {
            return alarm.alarmName.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });
    // alert(JSON.stringify(updatedAlarms));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms);
  }

  /** *********************************
   * @param {*} e
   ***********************************/
  sortByNameAsc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let name1 = alarm1.alarmName.toLowerCase();
            let name2 = alarm2.alarmName.toLowerCase();
            if (name1 < name2) //sort string ascending
                return -1
            if (name1 > name2)
                return 1
            return 0 //default return value (no sorting)
        });
    // alert(JSON.stringify(updatedAlarms.reverse()));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms);
  );
  /**
   * @param {*} e
   */
  sortByNameDesc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let name1 = alarm1.alarmName.toLowerCase();
            let name2 = alarm2.alarmName.toLowerCase();
            if (name1 < name2) //sort string ascending
                return -1
            if (name1 > name2)
                return 1
            return 0 //default return value (no sorting)
        });
    // alert(JSON.stringify(updatedAlarms));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms.reverse());
  }

  /***********************************
   * @param {*} e
   ********************************** */
  sortByTypeAsc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let type1 = alarm1.alarmType.toLowerCase();
            let type2 = alarm2.alarmType.toLowerCase();
            if (type1 < type2) //sort string ascending
                return -1
            if (type1 > type2)
                return 1
            return 0 //default return value (no sorting)
        });
    // alert(JSON.stringify(updatedAlarms.reverse()));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms);
  );
  /**
   * @param {*} e
   */
  sortByTypeDesc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let type1 = alarm1.alarmType.toLowerCase();
            let type2 = alarm2.alarmType.toLowerCase();
            if (type1 < type2) //sort string ascending
                return -1
            if (type1 > type2)
                return 1
            return 0 //default return value (no sorting)
        });
    // alert(JSON.stringify(updatedAlarms));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms.reverse());
  }

  /***********************************
   * @param {*} e
   ********************************** */
  sortByDeviceAsc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let device1 = alarm1.deviceName.toLowerCase();
            let device2 = alarm2.deviceName.toLowerCase();
            if (device1 < device2) //sort string ascending
                return -1
            if (device1 > device2)
                return 1
            return 0 //default return value (no sorting)
        });
    // alert(JSON.stringify(updatedAlarms.reverse()));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms);
  );
  /**
   * @param {*} e
   */
  sortByDeviceDesc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let device1 = alarm1.deviceName.toLowerCase();
            let device2 = alarm2.deviceName.toLowerCase();
            if (device1 < device2) //sort string ascending
                return -1
            if (device1 > device2)
                return 1
            return 0 //default return value (no sorting)
        });
    // alert(JSON.stringify(updatedAlarms));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms.reverse());
  }

  /***********************************
   * @param {*} e
   ********************************** */
  sortByDateAsc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let date1 = new Date(alarm1.dateAndTime);
            let date2 = new Date(alarm2.dateAndTime);
            return date1 - date2;
        });
    // alert(JSON.stringify(updatedAlarms.reverse()));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms);
  );
  /**
   * @param {*} e
   */
  sortByDateDesc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let date1 = new Date(alarm1.dateAndTime);
            let date2 = new Date(alarm2.dateAndTime);
            return date1 - date2;
        });
    // alert(JSON.stringify(updatedAlarms));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms.reverse());
  );
  /***********************************
   * @param {*} e
   ********************************** */
  sortByAckAsc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let ack1 = alarm1.toAck;
            let ack2 = alarm2.toAck;
            return ack1 - ack2;
        });
    // alert(JSON.stringify(updatedAlarms.reverse()));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms);
  }

  /**
   * @param {*} e
   */
  sortByAckDesc(e) {
    e.preventDefault();
    const initialAlarmList = this.props.alarmList.data;
    const updatedAlarms = initialAlarmList.sort((alarm1, alarm2) => {
            let ack1 = alarm1.toAck;
            let ack2 = alarm2.toAck;
            return ack1 - ack2;
        });
    // alert(JSON.stringify(updatedAlarms));
    this.props.updateAlarmList(ActionConstants.SEARCH_ALARMS, true, updatedAlarms.reverse());
  );
  }

  /********************************** */
  render() {
    return (
      <div className="function-bar">
        <div className='search-div'>
          <form>
            <input
type="text" className="form-control form-control-lg"
              placeholder="Search" onChange={this.handleSearch} />
          </form>
        </div>
        <div className='sort-div'>
          <Button className='sort-button' onClick={this.sortByDeviceAsc}>Sort</Button>
        </div>
        <div className='filter-div'>
          <Button className='filter-button'>Filter</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    alarmList: state.alarmList,
    updatedAlarmList: state.updatedAlarmList,
  };
}

const mapDispatchToProps = dispatch => ({
        updateAlarmList: (type, bool, data) =>
            dispatch(updateAlarmList(type, bool, data))
    });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlarmFunctions);

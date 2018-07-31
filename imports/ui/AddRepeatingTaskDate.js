import React from 'react';
import DayPicker from 'react-day-picker/DayPicker';

export default class AddRepeatingTaskDate extends React.Component {
  render() {
    const date = new Date(this.props.state.date);
    return (
      <div>
        <DayPicker selectedDays={date} onDayClick={day => this.props.onDayClick(day)} />
        <select value={this.props.state.repeatType} onChange={this.props.onRepeatTypeChange}>
          <option value='day'>Day</option>
          <option value='other day'>Other Day</option>
          <option value='weekday'>Weekday</option>
          <option value='weekend'>Weekend</option>
          <option value='week'>Week</option>
          <option value='other week'>Other Week</option>
          <option value='month'>Month</option>
          <option value='year'>Year</option>
        </select>
        <input
          type='number'
          placeholder='Instances'
          ref='instances'
          value={this.props.state.duration}
          onChange={this.props.onNumInstancesChange}
        />
      </div>
    );
  }
};

AddRepeatingTaskDate.propTypes = {
  onDayClick: React.PropTypes.func.isRequired,
  onRepeatTypeChange: React.PropTypes.func.isRequired,
  onNumInstancesChange: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
}

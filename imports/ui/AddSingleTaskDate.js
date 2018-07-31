import React from 'react';
import DayPicker from 'react-day-picker/DayPicker';

export default class AddSingleTaskDate extends React.Component {
  render() {
    const date = new Date(this.props.state.date);
    return (
      <DayPicker selectedDays={date} onDayClick={day => this.props.onDayClick(day)} />
    );
  }
};

AddSingleTaskDate.propTypes = {
  onDayClick: React.PropTypes.func.isRequired,
  state: React.PropTypes.object.isRequired
}

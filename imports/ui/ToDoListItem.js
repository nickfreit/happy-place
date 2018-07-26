import React from 'react';
import moment from 'moment';

export default class ToDoListItem extends React.Component {
  render() {
    return (
      <div>
        <h5>{this.props.todo.description}</h5>
        <p>{moment(this.props.todo.dueAt).calendar().split('at')[0]}</p>
      </div>
    );
  };
};

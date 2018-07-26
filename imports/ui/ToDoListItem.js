import React from 'react';

export default class ToDoListItem extends React.Component {
  render() {
    return (
      <div>
        <h5>{this.props.todo.description}</h5>
        <p>{this.props.todo.dueAt}</p>
      </div>
    );
  };
};

import React from 'react';
import moment from 'moment';
import {Todos} from '../api/todos';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export class ToDoListItem extends React.Component {
  render() {
    let jsxItem;
    if (this.props.day === 'today') {
      jsxItem = (
        <label className='checkbox'>
          <input
            className='checkbox__box'
            type='checkbox'
            onChange={(e) => {
              this.props.meteorCall('todos.update', this.props.todo._id, {done: e.target.checked});
            }}
          />
          {this.props.todo.description}
        </label>
      );
    } else {
      jsxItem = (
        <p>{this.props.todo.description}</p>
      );
    }
    return (
      <div>
        <h5>{this.props.day.charAt(0).toUpperCase() + this.props.day.slice(1)}</h5>
        {jsxItem}
      </div>
    );
  };
};

ToDoListItem.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, ToDoListItem);

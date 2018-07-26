import React from 'react';
import moment from 'moment';
import {Todos} from '../api/todos';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

export class ToDoListItem extends React.Component {
  render() {

    let itemClass;
    if (this.props.todo.done) {
      itemClass = 'todo todo--finished';
    } else if (this.props.day === 'today' || this.props.day === 'yesterday') {
      itemClass = 'todo todo--unfinished';
    } else {
      itemClass = 'todo';
    }

    let jsxItem;
    if (this.props.day === 'today') {
      jsxItem = (
        <div className={itemClass} onClick={() => {
          this.props.meteorCall('todos.update', this.props.todo._id,
          { done: !this.props.todo.done })
        }}>
          <p>{this.props.todo.description}</p>
          <button
            onClick={() => this.props.meteorCall('todos.remove', this.props.todo._id)}
            className='button button--pill'>
            x
          </button>
        </div>
      );
    } else if (this.props.day === 'tomorrow') {
      jsxItem = (
        <div className={itemClass} onClick={() => {
          this.props.meteorCall('todos.update', this.props.todo._id,
          { done: !this.props.todo.done })
        }}>
          <p>{this.props.todo.description}</p>
          <button
            onClick={() => this.props.meteorCall('todos.remove', this.props.todo._id)}
            className='button button--pill'>
            x
          </button>
        </div>
      );
    } else {
      jsxItem = (
        <div className={itemClass}>
          <p>{this.props.todo.description}</p>
        </div>
      );
    }


    return jsxItem;
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

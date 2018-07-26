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
        <div>
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
          <button
            onClick={() => this.props.meteorCall('todos.remove', this.props.todo._id)}
            className='button button--secondary'>
            x
          </button>
        </div>
      );
    } else if (this.props.day === 'tomorrow') {
      jsxItem = (
        <div>
          <p>{this.props.todo.description}</p>
          <button
            onClick={() => this.props.meteorCall('todos.remove', this.props.todo._id)}
            className='button button--secondary'>
            x
          </button>
        </div>
      );
    } else {
      jsxItem = (
        <div>
          <p>{this.props.todo.description}</p>
        </div>
      );
    }
    return (
      <div>
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

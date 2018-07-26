import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';

import {Todos} from '../api/todos';
import ToDoListItem from './ToDoListItem';

export class ToDoList extends React.Component {
  render() {
    let filteredTodos = new Array();
    if (this.props.day === 'today') {
      filteredTodos = this.props.todos.filter((todo) => {
        return moment().isSame(moment(todo.dueAt), 'day');
      });
    } else if (this.props.day == 'yesterday') {
      filteredTodos = this.props.todos.filter((todo) => {
        return moment().subtract(1, 'd').isSame(moment(todo.dueAt), 'day');
      });
    } else if (this.props.day == 'tomorrow') {
      filteredTodos = this.props.todos.filter((todo) => {
        return moment().add(1, 'd').isSame(moment(todo.dueAt), 'day');
      });
    }


      return (
        <div className='item-list'>
          {filteredTodos.map((todo) => <ToDoListItem key={todo._id} day={this.props.day} todo={todo}/>)}
        </div>
      );
  }
};

ToDoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  day: React.PropTypes.string.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('todos');

  return {
    todos: Todos.find({}).fetch()
  }
}, ToDoList);

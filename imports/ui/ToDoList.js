import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import {Todos} from '../api/todos';
import ToDoListItem from './ToDoListItem';

export class ToDoList extends React.Component {
  render() {
    return (
      <div className='item-list'>
        {this.props.todos.map((todo) => <ToDoListItem key={todo._id} todo={todo}/>)}
      </div>
    );
  }
};

ToDoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('todos');

  return {
    todos: Todos.find({}).fetch()
  }
}, ToDoList);

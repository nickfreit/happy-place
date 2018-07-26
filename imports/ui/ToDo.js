import React from 'react';

import PrivateHeader from './PrivateHeader';
import AddToDo from './AddToDo';
import ToDoList from './ToDoList';

export default class ToDo extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title="To Do"/>
        <AddToDo />
        <ToDoList />
        <ToDoList />
        <ToDoList />
      </div>
    );
  }
};

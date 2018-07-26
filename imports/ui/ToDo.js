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
        <div className='page-content'>
          <div className='page-content__list'>
            <ToDoList day="yesterday"/>
          </div>
          <div className='page-content__list'>
            <ToDoList day="today"/>
          </div>
          <div className='page-content__list'>
            <ToDoList day="tomorrow"/>
          </div>
        </div>
      </div>
    );
  }
};

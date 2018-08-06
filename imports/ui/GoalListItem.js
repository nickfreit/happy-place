import React from 'react'
import {Meteor} from 'meteor/meteor';

import AddTask from './AddTask';
import Task from './Task';
import ProgressBar from './ProgressBar';

export default class GoalListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showComplete: false,
      error: ''
    }
  }
  handleMarkComplete() {
    const tasks = this.props.goal.tasks;

    for (let i = 0; i < tasks.length; i++) {
      const toGo = tasks[i].numInstances - tasks[i].complete - tasks[i].skip;
      if (toGo > 0) {
        alert('Cannot complete goal until all tasks are completed');
        return;
      }
    }

    Meteor.call('goals.updateComplete', this.props.goal._id, true, (err, res) => {
      if (err) {
        this.setState({error: err.reason});
      }
    });
  }
  handleMarkNotComplete() {
    Meteor.call('goals.updateComplete', this.props.goal._id, false, (err, res) => {
      if (err) {
        this.setState({error: err.reason});
      }
    });
  }
  render () {
    let button;
    if (this.props.goal.complete) {
      button = (
        <button
          className='button'
          onClick={this.handleMarkNotComplete.bind(this)}>
          Unmark as complete
        </button>
      );
    } else {
      button = (
        <button
          className='button'
          onClick={this.handleMarkComplete.bind(this)}>
          Mark as complete
        </button>
      );
    }
    return (
      <div>
        <p>{this.props.goal.complete.toString()}</p>
        <p>{this.props.goal.description}</p>
        <p>{this.props.goal.duration} {this.props.goal.durType}</p>
        {button}
        <ProgressBar goal={this.props.goal}/>
        <div>
          <AddTask complete={this.props.goal.complete} goal={this.props.goal}/>
          <label>
            Show completed tasks
            <input type='checkbox' onClick={(e) => this.setState({showComplete: e.target.checked})}/>
          </label>
        </div>

        {this.props.goal.tasks ?
          this.props.goal.tasks.map((task) => {
            return (
              <div key={task._id} >
                <Task goal={this.props.goal} task={task} show={this.state.showComplete}/>
              </div>
            );
          }) :
          undefined}

      </div>
    );
  }
};

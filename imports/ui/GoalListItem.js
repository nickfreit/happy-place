import React from 'react'

import AddTask from './AddTask';
import Task from './Task';
import ProgressBar from './ProgressBar';

export default class GoalListItem extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.goal.description}</p>
        <p>{this.props.goal.duration} {this.props.goal.durType}</p>
        <ProgressBar goal={this.props.goal}/>
        <AddTask goal={this.props.goal}/>
        {this.props.goal.tasks ?
          this.props.goal.tasks.map((task) => {
            return (
              <div key={task._id} >
                <Task goal={this.props.goal} task={task}/>
              </div>
            );
          }) :
          undefined}

      </div>
    );
  }
};

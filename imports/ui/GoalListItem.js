import React from 'react'

import AddTask from './AddTask';
import ProgressBar from './ProgressBar';
import Task from './Task';

export default class GoalListItem extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.goal.description}</p>
        <p>{this.props.goal.duration} {this.props.goal.durType}</p>
        <AddTask goal={this.props.goal}/>
        {this.props.goal.tasks ?
          this.props.goal.tasks.map((task) => {
            return (
              <div key={task._id} >
                <Task task={task}/>
                <ProgressBar task={task}/>
              </div>
            );
          }) :
          undefined}

      </div>
    );
  }
};

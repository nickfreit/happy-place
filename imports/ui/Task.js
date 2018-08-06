import React from 'react';

import ControlInstance from './ControlInstance';

export default class Task extends React.Component {
  render() {
    const task = this.props.task;
    const toGo = task.numInstances - task.complete - task.skip;
    const done = toGo <= 0 ? true : false;
    if (done && !this.props.show) {
      return null;
    } else {
      return (
        <div>
          <p>{this.props.task.description}</p>
          <p>{this.props.task.complete} completed</p>
          <p>{this.props.task.skip} skipped </p>
          <p>{toGo} to go </p>
          <ControlInstance goal={this.props.goal} task={this.props.task} done={done}/>
        </div>
      );
    }
  }
};

Task.propTypes = {
  task: React.PropTypes.object.isRequired,
}

import React from 'react';

import ControlInstance from './ControlInstance';

export default class Task extends React.Component {
  render() {
    const task = this.props.task;
    const toGo = task.numInstances - task.complete - task.skip;
    if (toGo <= 0) {
      return null;
    } else {
      return (
        <div>
          <p>{this.props.task.description}</p>
          <p>What</p>
          <p>{this.props.task.complete} completed</p>
          <p>{this.props.task.skip} skipped </p>
          <p>{toGo} to go </p>
          <ControlInstance goal={this.props.goal} task={this.props.task} />
        </div>
      );
    }
  }
};

Task.propTypes = {
  task: React.PropTypes.object.isRequired,
}

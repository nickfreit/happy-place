import React from 'react';

export default class Task extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.task.description}</p>
      </div>
    );
  }
};

Task.propTypes = {
  task: React.PropTypes.object.isRequired,
}

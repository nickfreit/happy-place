import React from 'react'

export default class GoalListItem extends React.Component {
  render () {
    return (
      <div>
        <p>{this.props.goal.description}</p>
        <p>{this.props.goal.duration} {this.props.goal.durType}</p>
      </div>
    );
  }
};

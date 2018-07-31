import React from 'react'

import AddTask from './AddTask';

export default class GoalListItem extends React.Component {

  render () {
    return (
      <div>
        <p>{this.props.goal.description}</p>
        <p>{this.props.goal.duration} {this.props.goal.durType}</p>
        <AddTask goal={this.props.goal}/>

      </div>
    );
  }
};

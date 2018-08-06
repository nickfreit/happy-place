import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data'

import {Goals} from '../api/goals';
import GoalListItem from './GoalListItem';

export class GoalsList extends React.Component {
  render() {
    return (
      <div className='item-list'>
        {this.props.goals.map((goal) => {
          if (!goal.complete || this.props.showCompleteGoals) {
            return <GoalListItem key={goal._id} goal={goal}/>;
          }
        })}
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('goals');

  return {
    goals: Goals.find({}).fetch()
  }
}, GoalsList);

GoalsList.propTypes = {
  goals: React.PropTypes.array.isRequired
};

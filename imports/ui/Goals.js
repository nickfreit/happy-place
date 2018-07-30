import React from 'react';

import PrivateHeader from './PrivateHeader';
import GoalsList from './GoalsList';
import AddGoal from './AddGoal';

export default class Goals extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title='Goals'/>
        <AddGoal />
        <GoalsList />
      </div>
    );
  }
};

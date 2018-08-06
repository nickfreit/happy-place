import React from 'react';

import PrivateHeader from './PrivateHeader';
import GoalsList from './GoalsList';
import AddGoal from './AddGoal';

export default class Goals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCompleteGoals: false
    }
  }
  render() {
    return (
      <div>
        <PrivateHeader title='Goals'/>
        <AddGoal />
        <label>
          <input
            type='checkbox'
            onClick={(e) => this.setState({showCompleteGoals: e.target.checked})}
          />
          Show completed goals
        </label>
        <GoalsList showCompleteGoals={this.state.showCompleteGoals}/>
      </div>
    );
  }
};

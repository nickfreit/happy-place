import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Goals} from '../api/goals';

export default class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalInstances: 0,
      skip: 0,
      complete: 0,
    }
  }
  componentDidMount() {
    setTimeout(this.startTracker.bind(this), 0);
  }

  startTracker() {
    const elemComp = document.getElementById(this.props.goal._id);
    const elemSkip = document.getElementById(this.props.goal._id + 'skip');
    this.progressTracker = Tracker.autorun(() => {
      const goal = Goals.findOne({_id: this.props.goal._id, userId: Meteor.userId()});
      if (goal.tasks) {
        const justInstances = goal.tasks.map((task) => task.numInstances);
        this.totalInstances = justInstances.reduce((total, instances) => {
          return total + instances;
        });
        const justComplete = goal.tasks.map((task) => task.complete);
        this.complete = justComplete.reduce((total, complete) => {
          return total + complete;
        });
        const justSkip = goal.tasks.map((task) => task.skip);
        this.skip = justSkip.reduce((total, skip) => {
          return total + skip;
        });
      }
      if (this.totalInstances > 0) {
        elemComp.style.width = (this.complete / this.totalInstances)*100 + '%';
        elemSkip.style.width = (this.skip / this.totalInstances)*100 + '%';
      }
    });
  }

  componentWillUnmount() {
    this.progressTracker.stop();
  }

  render() {
    return (
        <div className='progress-bar'>
          <div id={this.props.goal._id} className='progress-bar__progress'>
          </div>
          <div id={this.props.goal._id + 'skip'} className='progress-bar__skipped'>
          </div>
        </div>
    );
  }
};

ProgressBar.propTypes = {
  goal: React.PropTypes.object.isRequired
}

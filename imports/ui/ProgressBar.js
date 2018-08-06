import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Meteor} from 'meteor/meteor';
import {Goals} from '../api/goals';

export default class ProgressBar extends React.Component {
  componentDidMount() {
    this.totalInstances = 0;
    this.complete = 0;
    this.skip = 0;
    setTimeout(this.startTracker.bind(this), 0);
  }

  startTracker() {
    const elemComp = document.getElementById(this.props.goal._id);
    const elemSkip = document.getElementById(this.props.goal._id + 'skip');
    this.progressTracker = Tracker.autorun(() => {
      const goal = Goals.findOne({_id: this.props.goal._id, userId: Meteor.userId()});
      this.totalInstances = 0;
      this.complete = 0;
      this.skip = 0;
      if (goal.tasks) {
        goal.tasks.map((task) => {
          this.totalInstances += task.numInstances;
          this.complete += task.complete;
          this.skip += task.skip;
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

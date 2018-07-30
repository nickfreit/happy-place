import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Modal from 'react-modal';

export class AddGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      description: '',
      duration: '',
      durationType: 'days',
      error: ''
    }
  }
  handleModalClose() {
    this.setState({isOpen: false, description: '', duration: '', error: ''} );
  }
  handleModalOpen() {
    this.refs.description.focus();
  }
  onDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onDurationChange(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  onDurationTypeChange(e) {
    e.preventDefault;
    this.setState({durationType: e.target.value})
  }
  onModalSubmit(e) {
    const description = this.state.description;
    const duration = Number(this.state.duration);
    const durType = this.state.durationType;

    e.preventDefault();

    Meteor.call('goals.insert', description, duration, durType, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({error: err.reason});
      }
    });
  }
  render() {
    return (
      <div className='page-content__button'>
        <button className='button' onClick={() => this.setState({isOpen: true})}>
          + Goal
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Goal"
          onAfterOpen={this.handleModalOpen.bind(this)}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'
          appElement={document.getElementById('app')}>
          <h1>Add Goal</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form className='boxed-view__form' onSubmit={this.onModalSubmit.bind(this)}>
            <input
              type='text'
              placeholder="Description"
              ref="description"
              value={this.state.description}
              onChange={this.onDescriptionChange.bind(this)}
            />
            <input
              type='number'
              placeholder='Duration'
              ref='duration'
              value={this.state.duration}
              onChange={this.onDurationChange.bind(this)}
            />
            <select value={this.state.durationType} onChange={this.onDurationTypeChange.bind(this)}>
              <option value='days'>Days</option>
              <option value='weeks'>Weeks</option>
              <option value='months'>Months</option>
              <option value='years'>Years</option>
            </select>
            <button className='button'>Add Goal</button>
            <button type='button' className='button button--secondary' onClick={this.handleModalClose.bind(this)}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
};


export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, AddGoal);

AddGoal.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
}

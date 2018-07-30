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
      error: ''
    }
  }
  handleModalClose() {
    this.setState({isOpen: false, description: '', duration: '', error: ''} );
  }
  handleModalOpen() {
    this.refs.description.focus();
  }
  onModalChange(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onModalSubmit(e) {
    const description = this.state.description;
    const duration = this.state.duration;

    e.preventDefault();

    Meteor.call('goals.insert', description, duration, (err, res) => {
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
              onChange={this.onModalChange.bind(this)}
            />
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

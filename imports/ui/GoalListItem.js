import React from 'react'
import Modal from 'react-modal';
import {createContainer} from 'meteor/react-meteor-data';


export class GoalListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      description: '',
      error: ''
    }
  }
  handleModalClose() {
    this.setState({isOpen: false, description: '', error: ''} );
  }
  handleModalOpen() {
    this.refs.description.focus();
  }
  onDescriptionChange(e) {
    this.setState({
      description: e.target.value
    });
  }
  onModalSubmit(e) {
    const description = this.state.description;
    const task = { description };

    e.preventDefault();

    Meteor.call('goals.update', this.props.goal._id, task, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState( {error: err.reason} );
      }
    });
  }
  render () {
    return (
      <div>
        <p>{this.props.goal.description}</p>
        <p>{this.props.goal.duration} {this.props.goal.durType}</p>
        <button className='button' onClick={() => this.setState({isOpen: true})}>+ Task</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel='Add Task'
          onAfterOpen={this.handleModalOpen.bind(this)}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'
          appElement={document.getElementById('app')}>
          <h1>Add Task</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form className='boxed-view__form' onSubmit={this.onModalSubmit.bind(this)}>
            <input
              type='text'
              placeholder='Description'
              ref='description'
              value={this.state.description}
              onChange={this.onDescriptionChange.bind(this)}/>
            <button className='button'>Add Task</button>
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
}, GoalListItem);

GoalListItem.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
}

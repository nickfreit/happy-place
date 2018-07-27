import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import Modal from 'react-modal';
import DayPicker from 'react-day-picker/DayPicker';

export class AddToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      description: '',
      dueAt: '',
      error: ''
    }
  }
  handleModalClose() {
    this.setState({isOpen: false, description: '', dueAt: '', error: ''} );
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
    const dueAt = this.state.dueAt;

    e.preventDefault();

    Meteor.call('todos.insert', description, dueAt, (err, res) => {
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
          + To Do
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add To Do"
          onAfterOpen={this.handleModalOpen.bind(this)}
          onRequestClose={this.handleModalClose.bind(this)}
          className='boxed-view__box'
          overlayClassName='boxed-view boxed-view--modal'
          appElement={document.getElementById('app')}>
          <h1>Add To Do</h1>
          {this.state.error ? <p>{this.state.error}</p> : null}
          <form className='boxed-view__form' onSubmit={this.onModalSubmit.bind(this)}>
            <input
              type='text'
              placeholder="Description"
              ref="description"
              value={this.state.description}
              onChange={this.onModalChange.bind(this)}
            />
            <DayPicker onDayChange={day => this.setState({dueAt: day})} />
            <button className='button'>Add To Do</button>
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
}, AddToDo);

AddToDo.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
}

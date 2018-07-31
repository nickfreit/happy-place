import React from 'react'
import Modal from 'react-modal';
import {createContainer} from 'meteor/react-meteor-data';
import uniqid from 'uniqid';

import AddSingleTaskDate from './AddSingleTaskDate';
import AddRepeatingTaskDate from './AddRepeatingTaskDate';

export class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      description: '',
      date: '',
      repeatType: 'day',
      type: 'single',
      numInstances: '',
      error: ''
    }
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      description: '',
      date: '',
      repeatType: 'day',
      type: 'single',
      numInstances: '',
      error: ''} );
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
    const date = this.state.date;
    const type = this.state.type;
    const repeatType = this.state.repeatType;
    const numInstances = Number(this.state.numInstances);
    const _id = uniqid();
    const task = { _id, description, date, type, repeatType, numInstances};

    e.preventDefault();

    Meteor.call('goals.update', this.props.goal._id, task, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState( {error: err.reason} );
      }
    });
  }
  onDayClick(day) {
    this.setState({date: day});
  }
  onRepeatTypeChange(e) {
    e.preventDefault();
    this.setState({repeatType: e.target.value});
  }
  onNumInstancesChange(e) {
    e.preventDefault();
    this.setState({numInstances: e.target.value});
  }
  render() {
    return (
      <div>
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
            <label>
              <input type='radio' name='type' value='single' defaultChecked
                onChange={() =>this.setState({type: 'single'})}/>
              Single
            </label>
            <label>
              <input type='radio' name='type' value='repeating'
                onChange={() => this.setState({type: 'repeating'})}/>
              Repeating
            </label>
            {this.state.type === 'single' ?
              <AddSingleTaskDate
                state={this.state}
                onDayClick={this.onDayClick.bind(this)}/> :
              <AddRepeatingTaskDate
                state={this.state}
                onDayClick={this.onDayClick.bind(this)}
                onRepeatTypeChange={this.onRepeatTypeChange.bind(this)}
                onNumInstancesChange={this.onNumInstancesChange.bind(this)}/>
              }
            <button className='button'>Add Task</button>
            <button type='button' className='button button--secondary' onClick={this.handleModalClose.bind(this)}>
              Cancel
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, AddTask);

AddTask.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  goal: React.PropTypes.object.isRequired
}

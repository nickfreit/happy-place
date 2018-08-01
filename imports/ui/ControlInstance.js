import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export class ControlInstance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      error: '',
      control: 'complete',
      checked: false
    }
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      error: '',
      control: 'complete',
    });
  }

  onModalSubmit(e) {
    e.preventDefault();
    if (this.state.control === 'complete') {
      this.props.meteorCall (
        'goals.updateTaskComplete',
        this.props.goal._id,
        this.props.task._id,
        (err, res) => {
          if (!err) {
            this.handleModalClose();
          } else {
            this.setState( {error: err.reason} );
          }
        }
      );
    } else if (this.state.control === 'skip') {
      this.props.meteorCall (
        'goals.updateTaskSkip',
        this.props.goal._id,
        this.props.task._id,
        (err, res) => {
          if (!err) {
            this.handleModalClose();
          } else {
            this.setState( {error: err.reason} );
          }
        }
      );
    }
  }
  onCheck(e) {
    this.setState({checked: e.target.checked});
    this.props.meteorCall (
      'goals.updateTaskComplete',
      this.props.goal._id,
      this.props.task._id,
      (err, res) => {
        if (err) {
          this.setState( {error: err.reason} );
        }
      }
    )
  }

  render() {
    let jsx;
    if (this.props.task.type === 'single') {
      jsx = (
        <div>
          <label className='checkbox'>
            <input
              className='checkbox__box'
              type="checkbox"
              checked={this.state.checked}
              onChange={this.onCheck.bind(this)} />
            Complete Task
          </label>
        </div>
      );
    } else if (this.props.task.type === 'repeating') {
      jsx = (
        <div>
          <button
            className='button'
            onClick={() => this.setState({isOpen: true})}>
            Control Instance
          </button>
          <Modal
            isOpen={this.state.isOpen}
            contentLabel='Control Instance'
            onRequestClose={this.handleModalClose.bind(this)}
            className='boxed-view__box'
            overlayClassName='boxed-view boxed-view--modal'
            appElement={document.getElementById('app')}>

            {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form className='boxed-view__form' onSubmit={this.onModalSubmit.bind(this)}>
              <label>
                <input type='radio' name='control' value='complete' defaultChecked
                  onChange={() => this.setState({control: 'complete'})}/>
                Complete
              </label>
              <label>
                <input type='radio' name='control' value='skip'
                  onChange={() => this.setState({control: 'skip'})}/>
                Skip
              </label>
              <button className='button'>
                {this.state.control.charAt(0).toUpperCase() + this.state.control.substr(1)}
              </button>
              <button className='button button--secondary' onClick={this.handleModalClose.bind(this)}>
                Cancel
              </button>
            </form>
          </Modal>
        </div>
      );
    }
    return jsx;
  }
};


export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, ControlInstance);

ControlInstance.propTypes = {
  meteorCall: React.PropTypes.func.isRequired
}

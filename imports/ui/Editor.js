import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Entries} from '../api/entries';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('entries.update', this.props.entry._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('entries.update', this.props.entry._id, { body });
  }
  componentDidUpdate(prevProps, prevState) {
    const currentEntryId = this.props.entry ? this.props.entry._id : undefined;
    const prevEntryId = prevProps.entry ? prevProps.entry._id : undefined;

    if (currentEntryId && currentEntryId !== prevEntryId) {
      this.setState({
        title: this.props.entry.title,
        body: this.props.entry.body
      });
    }
  }
  handleRemoval() {
    this.props.call('entries.remove', this.props.entry._id);
    this.props.browserHistory.push('/journal');
  }
  render() {
    if (this.props.entry) {
      return (
        <div className='editor'>
          <input className='editor__title'
            value={this.state.title}
            placeholder="Untitled entry"
            onChange={this.handleTitleChange.bind(this)}
          />
          <textarea className='editor__body'
            value={this.state.body}
            placeholder="Your entry here"
            onChange={this.handleBodyChange.bind(this)}
          />
          <div>
            <button
              className='button button--secondary'
              onClick={this.handleRemoval.bind(this)}>
              Delete Entry
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className='editor'>
          <p className='editor__message'>
            {this.props.selectedNoteId ?
              'Entry not found' :
              'Pick or create an entry to get started'}
          </p>
        </div>
      );
    }
  }
};

Editor.propTypes = {
  selectedNoteId: React.PropTypes.string,
  entry: React.PropTypes.object,
  call: React.PropTypes.func.isRequired,
  browserHistory: React.PropTypes.object.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    entry: Entries.findOne(selectedNoteId),
    call: Meteor.call,
    browserHistory
  };
}, Editor);

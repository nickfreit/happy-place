import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Entries} from '../api/entries';

export const EntryListHeader = (props) => {
  return (
    <div className='item-list__header'>
      <button  className='button' onClick={() => {
        props.meteorCall('entries.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedNoteId', res);
          }
        });
      }}>
        Create Note
      </button>
    </div>
  );
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, EntryListHeader);

export const EntryList = (props) => {
  return (
    <div>
      NoteList {props.notes.length}
    </div>
  );
};

EntryListHeader.propTypes = {
  meteorCall: React.PropTypes.func.isRequired,
  Session: React.PropTypes.object.isRequired
};

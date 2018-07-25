import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

import {Entries} from '../api/entries';
import EntryListHeader from './EntryListHeader';
import EntryListItem from './EntryListItem';
import EntryListEmptyItem from './EntryListEmptyItem';

export const EntryList = (props) => {
  return (
    <div className='item-list'>
      <EntryListHeader/>
      {props.entries.length === 0 ? <EntryListEmptyItem /> : undefined}
      {props.entries.map((entry) => <EntryListItem key={entry._id} entry={entry}/>)}
    </div>
  );
};

EntryList.propTypes = {
  entries: React.PropTypes.array.isRequired
}

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Meteor.subscribe('entries');

  return {
    entries: Entries.find({}, {sort: {updatedAt: -1}}).fetch().map((entry) => {
      entry.selected = (entry._id === selectedNoteId);
      return entry;
    })
  };
}, EntryList);

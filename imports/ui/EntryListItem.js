import React from 'react';
import moment from 'moment';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data'

export const EntryListItem = (props) => {
  const className = props.entry.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {
      props.Session.set('selectedNoteId', props.entry._id);
    }}>
      <h5 className='item__title'>{props.entry.title || 'Untitled note'}</h5>
      <p className='item__subtitle'>{moment(props.entry.updatedAt).format('M/DD/YY')}</p>
    </div>
  );
};

EntryListItem.propTypes = {
  entry: React.PropTypes.object.isRequired,
  Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
  return {Session};
}, EntryListItem);

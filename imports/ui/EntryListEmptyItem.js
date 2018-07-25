import React from 'react';
import {Meteor} from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import {Entries} from '../api/entries';

const EntryListEmptyItem = () => {
  return (
    <p className='empty-item'>Create an entry to get started!</p>
  );
};

export default EntryListEmptyItem;

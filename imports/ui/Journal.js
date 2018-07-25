import React from 'react';
import EntryList from './EntryList';
import Editor from './Editor';
import PrivateHeader from './PrivateHeader';

export default class Journal extends React.Component {
  render() {
    return (
      <div>
        <PrivateHeader title='Journal'/>
        <div className='page-content'>
          <div className='page-content__sidebar'>
            <EntryList />
          </div>
          <div className='page-content__main'>
            <Editor />
          </div>
        </div>
      </div>
    );
  }
};

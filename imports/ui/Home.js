import React from 'react';

import PrivateHeader from './PrivateHeader';

export default () => {
  return (
    <div>
      <PrivateHeader title="Home" />
      <div className='page-content'>
        Home page content.
      </div>
    </div>
  );
}

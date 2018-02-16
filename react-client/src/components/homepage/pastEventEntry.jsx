import React from 'react';
import { Link } from 'react-router-dom';
import PastEvents from '../pastEvents/index.jsx';

const PastEventEntry = ({event, key}) => {
  const { title } = event;

  return (
    <div>
      <Link to="/pastEvents" component={PastEvents}>
        {title}
      </Link>
    </div>
  );
};

export default PastEventEntry;

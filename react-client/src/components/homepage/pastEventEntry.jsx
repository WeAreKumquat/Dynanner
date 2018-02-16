import React from 'react';
import { Link } from 'react-router-dom';
import PastEvents from '../pastEvents/index.jsx';

const PastEventEntry = ({ event }) => {
  const { title } = event;

  return (
    <div>
      <Link to="/pastEvents">
        {title}
      </Link>
    </div>
  );
};

export default PastEventEntry;

import React from 'react';
import { Link } from 'react-router-dom';
import PastEvents from '../pastEvents/index.jsx';

const PastEventEntry = ({ event }) => {
  const { title } = event;

  return (
    <div>
      <Link to={{
        pathname: "/pastEvents",
        state: { reviewEvent: event },
      }}>
        {title}
      </Link>
    </div>
  );
};

export default PastEventEntry;

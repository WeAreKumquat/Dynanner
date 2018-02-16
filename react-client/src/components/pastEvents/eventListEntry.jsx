import React from 'react';

const EventListEntry = ({ event }) => {
  const { title } = event;
  return (
    <div>
      {/* date */}
      {/* event list entry name */}
      <h6>{title}</h6>
    </div>
  );
}

export default EventListEntry;

import React from 'react';

const UpcomingEventEntry = ({ event, key }) => {
  const { title, description } = event;
  console.log('title', title);
  console.log('desc', description);
  return (
    <div>
      Title: {title}
      <br />
      Description: {description}
      {/* upcoming event */}
    </div>
  );
};

export default UpcomingEventEntry;

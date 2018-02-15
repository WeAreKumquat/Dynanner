import React from 'react';

const UpcomingEventEntry = ({ title, description }) => {
  console.log('title', title);
  console.log('desc', description);
  return (
    <div>
      {title}
      {description}
      {/* upcoming event */}
    </div>
  );
};

export default UpcomingEventEntry;

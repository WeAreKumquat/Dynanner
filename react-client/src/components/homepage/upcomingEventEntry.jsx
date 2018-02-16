import React from 'react';

const UpcomingEventEntry = ({ event, key }) => {
  const { title, description } = event;
  const id = `#${title}`;

  return (
    <div className="card">
      <div className="card-header" id="headingOne">
        <h5 className="mb-0">
          <button className="btn btn-link collapsed" data-toggle="collapse" data-target={id} aria-expanded="false" aria-controls="collapseOne">
            {title}
          </button>
        </h5>
      </div>

      <div id={title} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
        <div className="card-body">
          {description}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEventEntry;

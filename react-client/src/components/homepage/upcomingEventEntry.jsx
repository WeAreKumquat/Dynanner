import React from 'react';
import { Link } from 'react-router-dom';

class UpcomingEventEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { _id, title, description } = this.props.event;
    const id = `#${title}`;

    return (
      <div className="card">
        <div className="card-header" id="headingOne">
          <h5 className="mb-0">
            <Link to="/reviewEvent">
              <span className="fa fa-check" />
            </Link>
            <button className="btn btn-link collapsed" data-toggle="collapse" data-target={id} aria-expanded="false" aria-controls="collapseOne">
              {title}
            </button>
            <a href="/">
              <span className="fa fa-trash-alt" />
            </a>
          </h5>
        </div>

        <div id={title} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div className="card-body">
            {description}
          </div>
        </div>
      </div>
    );
  }
}

export default UpcomingEventEntry;

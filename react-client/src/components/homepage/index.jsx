import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <h1>Welcome back, {currentUser}!</h1>
        <button>
          Add New Event
        </button>
      </div>
    );
  }
}

export default Home;

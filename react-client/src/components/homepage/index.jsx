import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: '',
    };
  }
  render() {
    return (
      <div>
        <h1>Welcome back, {this.state.currentUser}!</h1>
        <button>
          Add New Event
        </button>
      </div>
    );
  }
}

export default Home;

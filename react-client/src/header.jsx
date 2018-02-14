import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <header>
        Dynanner
        </header>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Header;


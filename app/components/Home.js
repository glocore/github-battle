// External Lib Imports
let React = require('react');
let Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Battle Your Friends!</h1>
        <Link className="button" to="/battle"><button>Battle</button></Link>
      </div>
    )
  }
}

module.exports = Home;

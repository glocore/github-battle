// External Lib Imports
let React = require('react');

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.text
    }
  }
  componentDidMount() {
    let stopper = this.props.text + '...';
    this.interval = window.setInterval(function() {
      if(this.state.text === stopper) {
        this.setState(function() {
          return {
            text: this.props.text
          };
        });
      } else {
        this.setState(function(prevState) {
          return {
            text: prevState.text + '.'
          };
        });
      }
    }.bind(this), this.props.interval)
  }
  
  componentWillUnmount() {
    window.clearInterval(this.interval);
  }
  
  render() {
    return (
        <p className="loading">
          {this.state.text}
        </p>
    )
  }
}

Loading.defaultProps = {
  text: 'Loading',
  interval: 300
};

module.exports = Loading;
// External Lib Imports
let React = require('react');
let PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState(function() {
      return {
        username: value
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.username
    );
  }

  render() {
    return(
      <form className="battle-player" onSubmit={this.handleSubmit}>
        <label className='battle-player__header' htmlFor="username">
          {this.props.label}
        </label>
        <input
          className="battle-player__input"
          id="username"
          placeholder="Github username"
          value={this.state.username}
          autoComplete="off"
          type="text"
          onChange={this.handleChange}
        />
        <button
          className="battle-player__submit"
          type="submit"
          disabled={!this.state.username}
        >
          Submit
        </button>
      </form>
    );
  }
}

// Main Exported Component
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneAvatar: '',
      playerTwoAvatar: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      let newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Avatar'] = 'https://github.com/'
        + username + '.png?size=200';
      return newState;
    })
  }

  render() {
    return(
      <div>
        <div className="battle-container">
          {!this.state.playerOneName
            && <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />}

          {!this.state.playerTwoName
            && <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />}
        </div>
      </div>
    );
  }
}

// PropTypes
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

module.exports = Battle;

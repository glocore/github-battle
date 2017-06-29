// External Lib Imports
let React = require('react');
let PropTypes = require('prop-types');
let Link = require('react-router-dom').Link;

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

function PlayerPreview(props) {
  return(
      <div>
        <div className="player-preview">
          <img
            className="avatar"
            src={props.avatar}
            alt={'Avatar for ' + props.username}
          />
          <h2>@{props.username}</h2>
          <button
            onClick={props.onReset.bind(null, props.id)}
          >
            Reset
          </button>
        </div>
      </div>
  )
}

// Main Exported Component
class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneAvatar: null,
      playerTwoAvatar: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function() {
      let newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Avatar'] = 'https://github.com/'
        + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function() {
        let newState = {};
        newState[id + 'Name'] = '';
        newState[id + 'Avatar'] = null;
        return newState;
    });
  }

  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneAvatar = this.state.playerOneAvatar;
    let playerTwoAvatar = this.state.playerTwoAvatar;
    return(
      <div>
        <div className="battle-container">
          {!playerOneName
            && <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}
          />}

          {playerOneAvatar!==null &&
            <PlayerPreview
              avatar={playerOneAvatar}
              username={playerOneName}
              id='playerOne'
              onReset={this.handleReset}
            />
          }

          {!playerTwoName
            && <PlayerInput
            id='playerTwo'
            label='Player Two'
            onSubmit={this.handleSubmit}
          />}

          {playerTwoAvatar!==null &&
          <PlayerPreview
              avatar={playerTwoAvatar}
              username={playerTwoName}
              id='playerTwo'
              onReset={this.handleReset}
          />
          }
        </div>
        {playerOneAvatar && playerTwoAvatar &&
          <Link
            className="button"
            to={{
              pathname: match.url + '/results',
              search:`?playerOneName=` + playerOneName + `&playerTwoName=`
                + playerTwoName
            }}
          >
            <button>
              Battle!
            </button>
          </Link>
        }
      </div>
    );
  }
}

// PropTypes
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

module.exports = Battle;

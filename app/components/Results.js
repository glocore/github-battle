// External Lib Imports
let React = require('react');
let PropTypes = require('prop-types');
let queryString = require('query-string');
let Link = require('react-router-dom').Link;

// Project Imports
let api = require('../utils/api');
let Loading = require('./Loading');

function Player(props) {
  let label = props.label;
  let profile = props.profile;
  let score = props.score;
  console.log(props);
  return(
      <div className="results-player__container">
        <div className="results-player__label">
          <p>{label}</p>
          <p className="results-player__handle">@{profile.login}</p>
          <p className="results-player__score">Score: {score}</p>
        </div>
        <div className="results-player__avatar">
          <img className="avatar" src={profile.avatar_url} alt={props.label + "\'s avatar"}/>
        </div>
        <div className="results-player__details">
          <ul>
            <li><b>{profile.name}</b></li>
            <li>{profile.location}</li>
            <li>Followers: {profile.followers}</li>
            <li>Following: {profile.following}</li>
            <li>Public Repos: {profile.public_repos}</li>
            <li><a href={profile.blog}>{profile.blog}</a></li>
          </ul>
        </div>
      </div>
  )
}

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  
  componentDidMount() {
    let players = queryString.parse(this.props.history.location.search);
    api.battle([
        players.playerOneName,
        players.playerTwoName
    ]).then(function(results) {
      if(results === null) {
        this.setState(function() {
          return {
            error: "Looks like there's an error. Make sure that both Github " +
                "users exist.",
            loading: false
          }
        })
      }
      
      this.setState(function() {
        return {
          loading: false,
          error: null,
          winner: results[0],
          loser: results[1]
        }
      })
    }.bind(this))
  }
  
  render() {
    let winner = this.state.winner;
    let loser = this.state.loser;
    let error = this.state.error;
    let loading = this.state.loading;
    
    if(loading) {
      return (
          <Loading/>
      )
    }
    
    if(error) {
      return (
          <div>
            <p>{error}</p>
            <Link to="/battle">Reset</Link>
          </div>
      )
    }
    
    return (
        <div>
          <div className="results-container">
            <Player
              label="Winner"
              profile={winner.profile}
              score={winner.score}
            />
            
            <Player
                label="Loser"
                profile={loser.profile}
                score={loser.score}
            />
          </div>
          <Link to="/battle"><button>Reset</button></Link>
        </div>
    )
  }
}

// PropTypes
Player.propTypes = {

};

module.exports = Results;
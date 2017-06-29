// External Lib Imports
let React = require('react');
let PropTypes = require('prop-types');

// Project Imports
let api = require('../utils/api');
let Loading = require('./Loading');

function SelectLanguage(props) {
  let languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
      <ul className="languages">
        {languages.map(function(lang) {
          return (
            <li
              style={props.selectedLanguage === lang
                ? {color: 'steelblue'}
                : null}
              onClick={props.updateLanguage.bind(null, lang)}
              key={lang}>
              {lang}
            </li>
          )
        })}
      </ul>
  );
}

function RepoGrid(props) {
  return(
    <ul className="popular-list">
      {props.repos.map(function(repo, index) {
        return (
          <li key={repo.name} className="popular-item">
              <div className="popular-item__avatar-container">
                <div className="popular-item__rank">Rank #{index + 1}</div>
                <img
                  className="avatar"
                  src={repo.owner.avatar_url}
                  alt={'Avatar for ' + repo.owner.login}
                />
              </div>

              <ul className="popular-item__details">
                <li>
                  <a className="popular-item__name" href={repo.html_url}>
                    {repo.name}
                  </a>
                </li>

                <li>@{repo.owner.login}</li>
                <li>Stars: {repo.stargazers_count}</li>
            </ul>
          </li>
        )
      })}
    </ul>
  );
}


// Main Exported Component
class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang)
    .then(function(repos) {
      this.setState(function() {
        return{
          repos: repos
        }
      });
      console.log(this.state.repos);
    }.bind(this));
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          updateLanguage={this.updateLanguage}
        />
        {
          !this.state.repos
            ? <Loading/>
            : <RepoGrid repos={this.state.repos} />
        }
      </div>

    );
  }
}

//PropTypes
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

module.exports = Popular;

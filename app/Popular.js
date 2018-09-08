var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api')
var Loading = require('./Loading');

//Stateless functional component for selected languages
function SelectLanguage(props) {

  var languages = ['All', 'JavaScript', 'Ruby', 'Java',
    'CSS', 'Python'];

  return (
    <ul className='languages'>
      {languages.map(function (lang) {
        return (
          //The style will change the color of the selected item
          <li style={lang === props.selectedLanguage ? { color: 'red' } : null}
            key={lang}
            onClick={props.onSelect.bind(null, lang)}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

function RepoGrid(props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li key={repo.name}
            className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img
                  className='avatar'
                  src={repo.owner.avatar_url}
                  alt={'avatar for ' + repo.owner.login}></img>
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} Stars</li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  //Set the initial state of the list items
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'all',
      repos: null
    }

    //Explicit binding of selected language
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  //Making AJAX request when component mounts to DOM
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  //To change the state of list items when clicked
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    //Updating the AJAX request with selected language
    api.fetchPopularRepos(lang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }

  //Start rendering the component
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />

      {
        !this.state.repos ? <Loading text='Fetching data' /> :
        <RepoGrid
          repos={this.state.repos} />
      }

      </div>
    )
  }
}

module.exports = Popular;

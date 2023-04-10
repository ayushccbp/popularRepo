import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here

const apiStatusConstant = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    languageData: [],
    selectedLanguage: languageFiltersData[0].id,
    apiStatus: apiStatusConstant.loading,
  }

  componentDidMount() {
    this.getLanguage()
  }

  getLanguage = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {selectedLanguage} = this.state

    const api = `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`

    const response = await fetch(api)
    const data = await response.json()
    const updatedData = data.popular_repos.map(eachData => ({
      name: eachData.name,
      id: eachData.id,
      issuesCount: eachData.issues_count,
      forksCount: eachData.forks_count,
      starsCount: eachData.stars_count,
      avatarUrl: eachData.avatar_url,
    }))
    if (response.ok === true) {
      this.setState({
        languageData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onSelectLanguage = id => {
    this.setState({selectedLanguage: id}, this.getLanguage)
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {languageData} = this.state
    return (
      <div className="language-card-container">
        {languageData.map(eachLanguage => (
          <RepositoryItem key={eachLanguage.id} eachLanguage={eachLanguage} />
        ))}
      </div>
    )
  }

  renderLanguage = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderSuccess()
      case apiStatusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    const {selectedLanguage} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular-heading">Popular</h1>
        <LanguageFilterItem
          languageFiltersData={languageFiltersData}
          onSelectLanguage={this.onSelectLanguage}
          selectedLanguage={selectedLanguage}
        />
        {this.renderLanguage()}
      </div>
    )
  }
}

export default GithubPopularRepos

import './index.css'

const RepositoryItem = props => {
  const {eachLanguage} = props
  const {name, avatarUrl, issuesCount, forksCount, starsCount} = eachLanguage

  return (
    <div className="language-card">
      <img className="language-image" src={avatarUrl} alt={name} />
      <h1 className="language-name">{name}</h1>
      <ul className="language-info-card-container">
        <li className="language-info-container">
          <img
            className="icon"
            alt="stars"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          />
          <p className="language-details">{starsCount}</p>
        </li>
        <li className="language-info-container">
          <img
            className="icon"
            alt="forks"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          />
          <p className="language-details">{forksCount}</p>
        </li>
        <li className="language-info-container">
          <img
            className="icon"
            alt="open issues"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          />
          <p className="language-details">{issuesCount}</p>
        </li>
      </ul>
    </div>
  )
}

export default RepositoryItem

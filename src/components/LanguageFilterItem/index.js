import './index.css'

const LanguageFilterItem = props => {
  const renderLanguage = () => {
    const {languageFiltersData} = props

    return languageFiltersData.map(language => {
      const {onSelectLanguage, selectedLanguage} = props
      const onClickLanguage = () => onSelectLanguage(language.id)
      const selectedLanguageClass =
        language.id === selectedLanguage
          ? 'language active-language'
          : 'language'

      return (
        <li key={language.id}>
          <button
            onClick={onClickLanguage}
            className={selectedLanguageClass}
            type="button"
          >
            {language.language}
          </button>
        </li>
      )
    })
  }

  return <ul className="language-container">{renderLanguage()}</ul>
}

export default LanguageFilterItem

import {FC} from 'react'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../store'
import {SearchResult} from '../domain/searchResult'

const SearchResultsView: FC = () => {
  const searchResults = useSelector<ApplicationState, SearchResult[]>(state => state.searchResults)
  return (
    <ul>
      {searchResults.map(it => (
        <li key={it.filename}>{it.filename}</li>
      ))}
    </ul>
  )
}

export default SearchResultsView
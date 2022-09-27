import {FC} from 'react'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../store'
import {SearchResult} from '../domain/searchResult'
import {Grid} from "@mui/material";

const SearchResultsView: FC = () => {
  const searchResults = useSelector<ApplicationState, SearchResult[]>(state => state.searchResults)
  return (
      <Grid container>
        <Grid item xs={12}>
          Search results
        </Grid>
        <Grid item xs={12}>
          <ul>
            {searchResults.map(it => (
              <li key={it.filename}>{it.filename}</li>
            ))}
          </ul>
        </Grid>
      </Grid>
  )
}

export default SearchResultsView
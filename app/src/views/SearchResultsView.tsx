import {FC} from 'react'
import {useSelector} from 'react-redux'
import {ApplicationState} from '../store'
import {SearchResult} from '../domain/searchResult'
import {Grid} from "@mui/material"

const SearchResultsView: FC = () => {
  const searchResults = useSelector<ApplicationState, SearchResult[]>(state => state.searchResults)
  return (
    <Grid container spacing={1} padding={1}>
      {searchResults.map(it => (
        <Grid item xs={12} sm={6} md={4} lg={2} xl={1} key={it.filename}>
          <img src={`${process.env.REACT_APP_REMOTE_URL}/get-image/${it.filename}`} alt={it.filename} style={{width:'100%'}}/>
        </Grid>
      ))}
    </Grid>
  )
}

export default SearchResultsView
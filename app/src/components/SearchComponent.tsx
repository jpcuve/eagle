import {ChangeEvent, FC, SyntheticEvent, useState} from 'react'
import {IconButton, InputBase, Paper, Stack, Tooltip} from '@mui/material'
import {Search} from '@mui/icons-material'
import api from '../api'
import {useNavigate} from 'react-router'
import {state} from '../store'

const SearchTextField: FC = () => {
  const navigate = useNavigate()
  const [term, setTerm] = useState<string>('')
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    try{
      state.updateSearchResults(await api.search(term))
      navigate('/search-results')
    } catch (e){
      state.updateFeedback({error: 'Cannot fetch results'})
    }
    setTerm('')
  }
  return (
    <Paper>
      <form noValidate={true} onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title={<span>Quicksearch</span>} arrow={true}>
            <IconButton type="submit">
              <Search/>
            </IconButton>
          </Tooltip>
          <InputBase autoFocus placeholder="Search" value={term} onChange={(e: ChangeEvent<HTMLInputElement>) => setTerm(e.currentTarget.value)} />
        </Stack>
      </form>
    </Paper>
  )
}

export default SearchTextField
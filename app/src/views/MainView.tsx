import {FC} from 'react'
import {
  Grid,
} from '@mui/material'
import ReactMarkdown from 'react-markdown'

const MainView: FC = () => {
  return (
    <Grid container spacing={1} padding={1}>
      <Grid item xs={12}>
        <ReactMarkdown>Eagle app information</ReactMarkdown>
      </Grid>
    </Grid>
  )
}

export default MainView
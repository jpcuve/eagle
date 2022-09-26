import {Outlet, useNavigate} from 'react-router'
import {FC, useState} from 'react'
import {
  Alert,
  AppBar,
  Box, Divider,
  IconButton,
  LinearProgress, ListItemIcon, ListItemText,
  Menu, MenuItem,
  Paper,
  Snackbar, Stack,
  Toolbar
} from '@mui/material'
import {Person, Logout, Camera} from '@mui/icons-material'
import {ApplicationState, state} from '../store'
import {useSelector} from 'react-redux'
import {defaultFeedback, Feedback} from '../domain/feedback'
import ReactMarkdown from 'react-markdown'
import SearchComponent from '../components/SearchComponent'

const MainLayout: FC = () => {
  const navigate = useNavigate()
  const feedback = useSelector<ApplicationState, Feedback>(state => state.feedback)
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null)
  const fetching = useSelector<ApplicationState, boolean>(state => state.fetching)
  return (
   <>
      {fetching && <LinearProgress color="secondary" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2000
      }}/>}
      <Box>
        <AppBar position="sticky">
          <Toolbar id="toolBar">
            <Box display="flex" flexDirection="row" flexWrap="nowrap" justifyContent="space-between" sx={{width: '100%'}}>
              <Stack direction="row" spacing={2}>
                <IconButton color="secondary" onClick={() => navigate('/')}>
                  <Camera/>
                </IconButton>
                <SearchComponent/>
              </Stack>
              <Stack direction="row">
                <IconButton color="secondary" onClick={e => setAnchorEl(e.currentTarget)}>
                  <Person/>
                </IconButton>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="row">
          <Box flex="0 1 auto" position="sticky" top={0} margin={1}
               sx={{alignSelf: 'flex-start', display: {xs: 'none', sm: 'inline'}}} component={Paper}>
          </Box>
          <Box flex="1 1 auto" padding={1} margin={1}>
            <Outlet/>
          </Box>
        </Box>
      </Box>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => navigate('/password-change')}>
          <ListItemText>blabla</ListItemText>
        </MenuItem>
        <Divider key="divider_1"/>
        <MenuItem onClick={() => navigate('/')}>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          <ListItemText>bloblo</ListItemText>
        </MenuItem>
      </Menu>
      <Snackbar autoHideDuration={5000} open={Object.keys(feedback).length > 0}
                onClose={() => state.updateFeedback(defaultFeedback)}>
        <Paper>
          {feedback.error && <Alert severity="error"><ReactMarkdown>{feedback.error}</ReactMarkdown></Alert>}
          {feedback.info && <Alert severity="info"><ReactMarkdown>{feedback.info}</ReactMarkdown></Alert>}
          {feedback.warning && <Alert severity="warning"><ReactMarkdown>{feedback.warning}</ReactMarkdown></Alert>}
          {feedback.success && <Alert severity="success"><ReactMarkdown>{feedback.success}</ReactMarkdown></Alert>}
        </Paper>
      </Snackbar>
    </>
  )
}

export default MainLayout
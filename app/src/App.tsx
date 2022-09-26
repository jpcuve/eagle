import  {FC} from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainView from './views/MainView'
import PageNotFoundView from './views/PageNotFoundView'
import MainLayout from './layouts/MainLayout'
import SearchResultsView from './views/SearchResultsView'


const App: FC = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE_NAME}>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route path="*" element={<MainView/>}/>
          <Route path="404" element={<PageNotFoundView/>}/>
          <Route path="search-results" element={<SearchResultsView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

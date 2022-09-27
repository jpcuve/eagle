import  {FC} from 'react'
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import MainView from './views/MainView'
import MainLayout from './layouts/MainLayout'
import SearchResultsView from './views/SearchResultsView'


const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<MainView/>}/>
          <Route path="*" element={<Navigate to="home"/>}/>
          <Route path="home" element={<MainView/>}/>
          <Route path="search-results" element={<SearchResultsView/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import {AnyAction, createStore} from "redux"
import {defaultFeedback, Feedback} from './domain/feedback'
import {SearchResult} from './domain/searchResult'

export interface ApplicationState {
  fetching: boolean,
  feedback: Feedback,
  searchResults: SearchResult[]
}

const defaultApplicationState: ApplicationState = {
  fetching: false,
  feedback: defaultFeedback,
  searchResults: [],
}

const rootReducer = (state: ApplicationState = defaultApplicationState, action: AnyAction) => {
  // console.log(`Reducer is called, action: ${JSON.stringify(action)}`)
  switch (action.type) {
    case 'update-fetching':
      return {...state, fetching: action.fetching}
    case 'update-feedback':
      return {...state, feedback: action.feedback}
    case 'update-search-results':
      return {...state, searchResults: action.searchResults}
  }
  return state
}

export const store = createStore(rootReducer, {...defaultApplicationState})

export const state = {
  updateFetching: (fetching: boolean) => store.dispatch({type: 'update-fetching', fetching}),
  updateFeedback: (feedback: Feedback) => store.dispatch({type: 'update-feedback', feedback}),
  updateSearchResults: (searchResults: SearchResult[]) => store.dispatch({type: 'update-search-results', searchResults}),
}

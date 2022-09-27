import remote from "./remote"
import {state} from "./store"
import {defaultFeedback} from './domain/feedback'
import {SearchResult} from './domain/searchResult'

// const delay = async (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

const API_PREFIX = '/api'

async function wrap<T>(fn: () => Promise<T>): Promise<T> {
  state.updateFeedback(defaultFeedback)
  state.updateFetching(true)
  try {
    return await fn()
  } catch (e: any) {
    state.updateFeedback({error: e.message})
    throw e
  } finally {
    state.updateFetching(false)
  }
}

class Api {
  async search(query: string) { return wrap(() => remote.post<SearchResult[]>(`${API_PREFIX}/search`, query)) }
}

export default new Api()
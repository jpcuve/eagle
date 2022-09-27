
class Client {

  private async rpc<T>(endPoint: string, method: string = 'GET', contentType: string = '', body: any | null = null): Promise<T> {
    const options: any = {
      method,
      headers: {
        'Accept': 'application/json',
        credentials: 'include',
      },
    }
    const token = this.token()
    if (token.length > 0){
      options.headers['Authorization'] = `Bearer ${token}`
    }
    if (body){
      if (contentType){
        options.headers['Content-Type'] = contentType
      }
      options.body = body;
    }
    // console.debug(JSON.stringify(options))
    const res = await fetch(`${process.env.REACT_APP_REMOTE_URL}${endPoint}`, options)
    if (!res.ok){
      throw Error(`Http error: ${res.status} ${res.statusText}`)
    }
    const json = await res.json()
    if (typeof json === 'object' && 'error' in json) {
      const message = json.error
      console.error(json['error_description'])
      throw Error(message)
    }
    return json as T;
  }

  token(): string {
    return sessionStorage.getItem('token') || ''
  }

  async get<T>(endPoint: string): Promise<T> {
    return this.rpc<T>(endPoint)
  }

  async post<T>(endPoint: string, data: any|FormData|URLSearchParams|string): Promise<T> {
    let contentType: undefined|string
    if (data instanceof FormData){
      contentType = undefined
    } else if (data instanceof URLSearchParams) {
      contentType = 'application/x-www-form-urlencoded'
    } else if (data instanceof String) {
      contentType = 'text/plain'
    } else {
      contentType = 'application/json'
      data = JSON.stringify(data)
    }
    return this.rpc<T>(endPoint, 'POST', contentType, data)
  }

  async put<T>(endPoint: string, data: any): Promise<T> {
    return this.rpc<T>(endPoint, 'PUT', 'application/json', JSON.stringify(data))
  }

  async delete<T>(endPoint: string): Promise<T> {
    return this.rpc<T>(endPoint, 'DELETE')
  }
}

export default new Client()


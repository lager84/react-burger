
export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export function checkResponse(res) {
  return res.ok ? res.json() : `Ошибка ${res.status}`
}
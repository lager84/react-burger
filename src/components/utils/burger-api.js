import { BASE_URL } from './domain'

export function getIngredients() {

  return fetch(`${BASE_URL}/ingredients`)
    .then((res) => { return res.ok ? res.json() : `Ошибка ${res.status}` })
    .catch((error) => { console.log(error) })

}
import { BASE_URL } from './domain'
import {checkResponse} from './checkResponse'


export function getIngredients() {

  return fetch(`${BASE_URL}/ingredients`)
    .then((res) => checkResponse(res))

}


import { BASE_URL } from './domain'
import { request} from './request'


export function getIngredients() {

  return request(`${BASE_URL}/ingredients`)

}


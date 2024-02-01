import { BASE_URL } from './domain'


export function postOrder(ingredients) {

    return fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
    })
        .then((res) => { return res.ok ? res.json() : `Ошибка ${res.status}`})
        .catch((error) => { console.log(error) })
}
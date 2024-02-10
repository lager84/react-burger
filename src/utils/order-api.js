import { BASE_URL } from './domain'
import {request } from './request'



export function postOrder(ingredients) {

    return request(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ ingredients: ingredients.map(item => item._id) })
    })
       
       
}
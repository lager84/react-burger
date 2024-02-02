

export function checkResponse(res) {
    return res.ok ? res.json() : `Ошибка ${res.status}`
}
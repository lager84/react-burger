
export const LOADING_DATA = "Идет загрузка...";

export const ERROR_DATA = "Ошибка при загрузке данных с сервера";
export function getEventMessage(e: Event) {
    if (e instanceof ErrorEvent) {
        return e.message;
    } else if (e instanceof CloseEvent) {
        return `${e.code} ${e.reason}`;
    }

    return `Ошибка ${e.type}: ${JSON.stringify(e, Object.getOwnPropertyNames(e))}`;}
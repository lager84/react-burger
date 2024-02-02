export const sumInitialValue = { sum: 0 };

export function sumReducer(state, action) {
    switch (action.type) {
        case 'set':
            return { sum: action.value };
        case 'reset':
            return sumInitialValue;
        default:
            throw Error(`Что то пошло не так: ${action.type}`);
    }
}
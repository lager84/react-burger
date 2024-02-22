import { useState, useCallback } from 'react';

export function useFormCallback(initialState, submitCallback) {

    const [state, setState] = useState(initialState);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        if (submitCallback) {
            const stateP = { ...state };
            delete stateP.wasSubmit;
            submitCallback(stateP);
            setState({ ...state, wasSubmit: true });
        }
    }, [state, submitCallback]);

    const onChange = useCallback((e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }, [state]);

    return { state, setState, onSubmit, onChange };
}
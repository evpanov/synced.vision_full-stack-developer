export const BaseReducer = (initialState, actions) => {
    const reducer = (state, action) => {
        return (action.scope !== state.scope) ? {} : actions(state, action);
    };

    return (state = initialState, action = undefined) => {
        try {
            return reducer(state, action)[action.type]();
        } catch (e) {
            return state;
        }
    }
};
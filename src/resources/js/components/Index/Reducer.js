import {BaseReducer} from "../BaseReducer";

export const REQUESTING_DATA = 'REQUESTING_DATA';
export const ON_REQUEST_DATA = 'ON_REQUEST_DATA';
export const ON_RECEIVED_DATA = 'ON_RECEIVED_DATA';

export const ROWS = 'ROWS';

const initialState = {
    scope: 'INDEX',
    [REQUESTING_DATA]: false,
    [ROWS]: []
};

const actions = (state, action) => {
    return {
        [ON_REQUEST_DATA]: () => {
            return {
                ...state,
                [REQUESTING_DATA]: true,
                [ROWS]: []
            }
        },
        [ON_RECEIVED_DATA]: () => {
            return {
                ...state,
                [REQUESTING_DATA]: false,
                [ROWS]: action.payload
            }
        }
    };
}

export default BaseReducer(initialState, actions);

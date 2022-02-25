import {BaseReducer} from "../BaseReducer";

export const ON_CHANGE = 'ON_CHANGE_'
export const FIELD_CITY = 'FIELD_CITY';

export const SOURCE = 'SOURCE';
export const SOURCE_API = 'api';
export const SOURCE_DB = 'db';

export const REQUESTING_DATA = 'REQUESTING_DATA';
export const ON_REQUEST_DATA = 'ON_REQUEST_DATA';
export const ON_RECEIVED_DATA = 'ON_RECEIVED_DATA';

export const DATA = 'DATA';

const initialState = {
    scope: 'INDEX',
    [FIELD_CITY]: '',
    [SOURCE]: null,
    [REQUESTING_DATA]: false,
    [DATA]: null
};

const actions = (state, action) => {
    return {
        [ON_CHANGE + FIELD_CITY]: () => {
            return {
                ...state,
                [FIELD_CITY]: action.payload,
            }
        },
        [ON_REQUEST_DATA]: () => {
            return {
                ...state,
                [SOURCE]: action.payload,
                [REQUESTING_DATA]: true,
                [DATA]: null
            }
        },
        [ON_RECEIVED_DATA]: () => {
            return {
                ...state,
                [REQUESTING_DATA]: false,
                [DATA]: action.payload
            }
        }
    };
}

export default BaseReducer(initialState, actions);

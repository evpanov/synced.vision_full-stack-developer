import {ON_RECEIVED_DATA, ON_REQUEST_DATA} from "./Reducer";

export const changeTextFieldValue = (self, type, event) => ({
    scope: self.props.scope,
    type: type,
    payload: event.target.value
});

export const requestData = (self, source) => ({
    scope: self.props.scope,
    type: ON_REQUEST_DATA,
    payload: source
});

export const receivedData = (self, data) => ({
    scope: self.props.scope,
    type: ON_RECEIVED_DATA,
    payload: data
});

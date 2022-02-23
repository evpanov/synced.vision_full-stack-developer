import {ON_RECEIVED_DATA, ON_REQUEST_DATA} from "./Reducer";

export const requestData = (self) => ({
    scope: self.props.scope,
    type: ON_REQUEST_DATA
});

export const receivedData = (self, data) => ({
    scope: self.props.scope,
    type: ON_RECEIVED_DATA
});

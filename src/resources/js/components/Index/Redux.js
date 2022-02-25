import {REQUESTING_DATA, DATA, FIELD_CITY, SOURCE} from "./Reducer";
import {changeTextFieldValue, receivedData, requestData} from "./Actions";
import {connect} from "react-redux";
import Container from "./Container";

const mapStateToProps = state => {
    const reducerState = state.IndexReducer
    return {
        scope: reducerState.scope,
        [FIELD_CITY]: reducerState[FIELD_CITY],
        [SOURCE]: reducerState[SOURCE],
        [REQUESTING_DATA]: reducerState[REQUESTING_DATA],
        [DATA]: reducerState[DATA]
    };
};

const mapDispatchToProps = {
    changeTextFieldValue,
    requestData,
    receivedData
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);

import {REQUESTING_DATA, ROWS} from "./Reducer";
import {receivedData, requestData} from "./Actions";
import {connect} from "react-redux";
import Container from "./Container";

const mapStateToProps = state => {
    const reducerState = state.IndexReducer
    return {
        scope: reducerState.scope,
        [REQUESTING_DATA]: reducerState[REQUESTING_DATA],
        [ROWS]: reducerState[ROWS]
    };
};

const mapDispatchToProps = {
    requestData,
    receivedData
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);

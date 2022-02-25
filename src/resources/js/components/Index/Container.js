import {Component} from "react";
import {Box} from "@mui/material";
import View from "./View";
import {handlerRequestData} from "./Handlers";

export default class Container extends Component {
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        handlerRequestData(this, prevProps);
    }

    render() {
        return (
            <Box>
                <View
                    {...this.props}
                />
            </Box>
        );
    }
}

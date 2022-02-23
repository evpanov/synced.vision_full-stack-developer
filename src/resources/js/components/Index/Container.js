import {Component} from "react";
import {Box} from "@mui/material";
import View from "./View";

export default class Container extends Component {
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

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

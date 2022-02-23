import {Component} from "react";
import {AlertTitle, Box, Container, ThemeProvider} from "@mui/material";
import {muiTheme} from "../../muiTheme";

export default class View extends Component {
    render() {
        return (
            <ThemeProvider theme={muiTheme}>
                <Box>
                    <Container maxWidth={"xl"}>
                        <AlertTitle>Weather</AlertTitle>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

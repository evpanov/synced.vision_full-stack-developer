import {Component} from "react";
import {AlertTitle, Box, Button, Container, Grid, TextField, ThemeProvider} from "@mui/material";
import {muiTheme} from "../../muiTheme";
import {FIELD_CITY, ON_CHANGE} from "./Reducer";
import {changeTextFieldValue} from "./Actions";

export default class View extends Component {
    render() {
        return (
            <ThemeProvider theme={muiTheme}>
                <Box>
                    <Container maxWidth={"xl"}>
                        <h1>Weather {this.props[FIELD_CITY]}</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="City"
                                    variant="standard"
                                    fullWidth
                                    onChange={(event => this.props.changeTextFieldValue(this, ON_CHANGE + FIELD_CITY, event))}
                                    value={this.props[FIELD_CITY]}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    size={"large"}
                                >Get from API</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    size={"large"}
                                >Get from DB</Button>
                            </Grid>
                        </Grid>
                        <hr/>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

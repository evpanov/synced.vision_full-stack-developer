import {Component} from "react";
import {AlertTitle, Box, Button, Container, Grid, TextField, ThemeProvider} from "@mui/material";
import {muiTheme} from "../../muiTheme";

export default class View extends Component {
    render() {
        return (
            <ThemeProvider theme={muiTheme}>
                <Box>
                    <Container maxWidth={"xl"}>
                        <h1>Weather</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id="outlined-basic"
                                    label="City"
                                    variant="standard"
                                    fullWidth
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

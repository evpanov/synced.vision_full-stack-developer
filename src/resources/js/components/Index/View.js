import {Component} from "react";
import {Box, Button, Container, Grid, TextField, ThemeProvider} from "@mui/material";
import {muiTheme} from "../../muiTheme";
import {DATA, FIELD_CITY, ON_CHANGE, SOURCE, SOURCE_API, SOURCE_DB} from "./Reducer";
import {changeTextFieldValue} from "./Actions";
import {DataGrid} from '@mui/x-data-grid';

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
                                    onClick={(event => this.props.requestData(this, SOURCE_API))}
                                    disabled={this.props[FIELD_CITY].length === 0}
                                >Get from API</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    size={"large"}
                                    onClick={(event => this.props.requestData(this, SOURCE_DB))}
                                    disabled={this.props[FIELD_CITY].length === 0}
                                >Get from DB</Button>
                            </Grid>
                        </Grid>
                        <hr/>
                        {this.props[DATA] && this.props[DATA].rows && this.props[DATA].rows.length !== 0 && (
                            <div style={{height: 400, width: '100%'}}>
                                <Box container>
                                    <h2>{this.props[DATA].city ?? ''}</h2>
                                    {this.props[SOURCE] === SOURCE_API ? (
                                        <div>
                                            <b>Period</b>
                                            <ul>
                                                <li>
                                                    Start at: {this.props[DATA].rows[0].dt}
                                                </li>
                                                <li>
                                                    End at: {this.props[DATA].rows[this.props[DATA].rows.length - 1].dt}
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <b>Updated at: {this.props[DATA].rows[0].updated_at}</b>
                                    )}
                                </Box>
                                <DataGrid
                                    rows={this.props[DATA].rows}
                                    columns={[
                                        {
                                            field: 'dt',
                                            headerName: 'Datetime',
                                            flex: 0.25
                                        },
                                        {
                                            field: 'temperature_min',
                                            headerName: 'Temperature Min',
                                            flex: 0.25,
                                            valueFormatter: (params) => {
                                                return `${params.value} °C`;
                                            },
                                        },
                                        {
                                            field: 'temperature_max',
                                            headerName: 'Temperature Max',
                                            flex: 0.25,
                                            valueFormatter: (params) => {
                                                return `${params.value} °C`;
                                            },
                                        },
                                        {
                                            field: 'wind_speed',
                                            headerName: 'Wind Speed',
                                            flex: 0.25,
                                            valueFormatter: (params) => {
                                                return `${params.value} km/h`;
                                            },
                                        },
                                    ]}
                                />
                            </div>
                        )}
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }
}

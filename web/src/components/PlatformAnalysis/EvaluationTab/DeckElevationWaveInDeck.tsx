import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import TextField from '../../FormWidget/TextField';
import ExpansionRow from '../ExpansionRow';

export default function DeckElevationWaveInDeck() {
    const { watch } = useFormContext();

    let cellar_deck_height = watch(
        'deck_elevation_wave_in_deck.cellar_deck_height'
    );

    if (cellar_deck_height === null) {
        cellar_deck_height = 'None';
    } else {
        cellar_deck_height = `${cellar_deck_height} m`;
    }

    return (
        <ExpansionRow
            title="Deck Elevation - Wave in Deck"
            score={watch('deck_elevation_wave_in_deck_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Cellar Deck Height
                        </Typography>
                        <Typography variant="h5">
                            {cellar_deck_height}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            name={[
                                'deck_elevation_wave_in_deck',
                                'highest_astronomical_tide',
                            ]}
                            label="Highest Astronomical Tide (HAT)"
                            unit="m"
                            nullable
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={6} />
                    </Hidden>

                    <Grid item xs={12} md={6}>
                        <TextField
                            name={[
                                'deck_elevation_wave_in_deck',
                                'crest_height_factor',
                            ]}
                            label="Crest Height Factor"
                            unit="m"
                            nullable
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={4} />
                    </Hidden>

                    <Grid item xs={12} md={8}>
                        <TableContainer component={Paper} elevation={3}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Return Periods (Years)
                                        </TableCell>
                                        <TableCell>
                                            Maximum Wave Height (m)
                                        </TableCell>
                                        <TableCell>Storm Surge (m)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>10</TableCell>
                                        <TableCell>
                                            <TextField
                                                name={[
                                                    'deck_elevation_wave_in_deck',
                                                    'maximum_wave_height_10_years',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={[
                                                    'deck_elevation_wave_in_deck',
                                                    'storm_surge_10_years',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>100</TableCell>
                                        <TableCell>
                                            <TextField
                                                name={[
                                                    'deck_elevation_wave_in_deck',
                                                    'maximum_wave_height_100_years',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={[
                                                    'deck_elevation_wave_in_deck',
                                                    'storm_surge_100_years',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>10,000</TableCell>
                                        <TableCell>
                                            <TextField
                                                name={[
                                                    'deck_elevation_wave_in_deck',
                                                    'maximum_wave_height_10000_years',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                name={[
                                                    'deck_elevation_wave_in_deck',
                                                    'storm_surge_10000_years',
                                                ]}
                                                label=""
                                                size="small"
                                                nullable
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}

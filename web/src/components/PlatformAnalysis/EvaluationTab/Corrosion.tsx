import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import DatePicker from '../../FormWidget/DatePicker';
import TextField from '../../FormWidget/TextField';
import ExpansionRow from '../ExpansionRow';

export default function GroutedPiles() {
    const { watch } = useFormContext();

    const anode_retrofit_date = watch('corrosion.anode_retrofit_date');

    return (
        <ExpansionRow
            title="Corrosion"
            score={watch('corrosion_score')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item container xs={12} md={10} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                {watch('corrosion.platform_design_life')} years
                            </Typography>
                            <Typography variant="subtitle2" gutterBottom>
                                Platform Design Life
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={['corrosion', 'cp_design_life']}
                                label="CP Design Life"
                                unit="years"
                                disabled={!anode_retrofit_date}
                            />
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={12} md={6} />
                        </Hidden>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                name={[
                                    'corrosion',
                                    'original_anode_installation_date',
                                ]}
                                label="Original Anodes Installation Date"
                                required
                            />
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={12} md={6} />
                        </Hidden>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                name={['corrosion', 'anode_retrofit_date']}
                                label="Anode Retrofit Date"
                            />
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={12} md={6} />
                        </Hidden>

                        <Grid item xs={12} md={6}>
                            <DatePicker
                                name={[
                                    'corrosion',
                                    'anode_survey_inspection_date',
                                ]}
                                label="Anode Survey/Inspection Date"
                                disabled={!anode_retrofit_date}
                                required
                            />
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={12} md={6} />
                        </Hidden>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={[
                                    'corrosion',
                                    'average_anode_depletion_from_survey',
                                ]}
                                label="Average Anode Depletion From Survey"
                                unit="%"
                                disabled={!anode_retrofit_date}
                            />
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={12} md={6} />
                        </Hidden>

                        <Grid item xs={12} md={6}>
                            <TextField
                                name={[
                                    'corrosion',
                                    'average_anode_potential_from_survey',
                                ]}
                                label="Average Anode Potential From Survey"
                                unit="mV"
                                disabled={!anode_retrofit_date}
                            />
                        </Grid>

                        <Hidden smDown>
                            <Grid item xs={12} md={6} />
                        </Hidden>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}

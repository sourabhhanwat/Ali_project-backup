import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import IsoDate from '../../IsoDate';
import ExpansionRow from '../ExpansionRow';

export default function PlatformVintage() {
    const { watch } = useFormContext();

    return (
        <ExpansionRow
            title="Platform Vintage"
            score={watch('platform_vintage_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Design Date</Typography>
                        <Typography variant="h5" gutterBottom>
                            <IsoDate
                                date={watch('design_date')}
                                emptyValue="None"
                                pattern="dd/MM/yyyy"
                            />
                        </Typography>

                        <Typography variant="subtitle2">
                            Platform Installation Date
                        </Typography>
                        <Typography variant="h5">
                            <IsoDate
                                date={watch('platform_installation_date')}
                                emptyValue="None"
                                pattern="dd/MM/yyyy"
                            />
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}

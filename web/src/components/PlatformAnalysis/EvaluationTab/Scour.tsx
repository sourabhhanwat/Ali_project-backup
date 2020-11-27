import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ExpansionRow from '../ExpansionRow';

export default function Scour() {
    const { watch } = useFormContext();

    let measured_scour_depth_during_inspection = watch(
        'scour.measured_scour_depth_during_inspection'
    );

    if (measured_scour_depth_during_inspection) {
        measured_scour_depth_during_inspection = `${measured_scour_depth_during_inspection} m`;
    } else {
        measured_scour_depth_during_inspection = 'None';
    }

    return (
        <ExpansionRow
            title="Scour"
            score={watch('scour_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Design Scour Depth
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {watch('scour.design_scour_depth')} m
                        </Typography>

                        <Typography variant="subtitle2">
                            Measured Scour Depth During Inspection
                        </Typography>
                        <Typography variant="h5">
                            {measured_scour_depth_during_inspection}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}

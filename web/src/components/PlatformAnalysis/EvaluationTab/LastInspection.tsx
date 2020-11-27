import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import IsoDate from '../../IsoDate';
import ExpansionRow from '../ExpansionRow';

export default function LastInspection() {
    const { watch } = useFormContext();

    let rbui_inspection_interval = watch(
        'last_inspection.rbui_inspection_interval'
    );

    if (rbui_inspection_interval) {
        rbui_inspection_interval = `${rbui_inspection_interval} years`;
    } else {
        rbui_inspection_interval = 'None';
    }

    return (
        <ExpansionRow
            title="Last Inspection"
            score={watch('last_inspection_score')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container>
                    <Grid item>
                        <Typography variant="subtitle2">
                            Last Underwater Inspection Date
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <IsoDate
                                date={watch(
                                    'last_inspection.last_underwater_inspection_date'
                                )}
                                pattern="dd/MM/yyyy"
                                emptyValue="None"
                            />
                        </Typography>

                        <Typography variant="subtitle2">
                            RBUI Assessment Date
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            <IsoDate
                                date={watch('rbui_assessment_date')}
                                pattern="dd/MM/yyyy"
                                emptyValue="None"
                            />
                        </Typography>

                        <Typography variant="subtitle2">
                            RBUI Inspection Interval
                        </Typography>
                        <Typography variant="h5">
                            {rbui_inspection_interval}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}

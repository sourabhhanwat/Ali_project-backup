import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import DatePicker from '../../FormWidget/DatePicker';
import TextField from '../../FormWidget/TextField';
import ExpansionRow from '../ExpansionRow';

export default function FloodedMember() {
    const { watch } = useFormContext();

    let number_of_flooded_members_in_last_inspection = watch(
        'flooded_member.number_of_flooded_members_in_last_inspection'
    );

    if (number_of_flooded_members_in_last_inspection === null) {
        number_of_flooded_members_in_last_inspection = 'None';
    }

    return (
        <ExpansionRow
            title="Flooded Member"
            score={watch('flooded_member_score')}
            override={watch('reserve_strength_ratio_score.rsr_override')}
            headNoBorderBottom
        >
            <Box m={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">
                            Number of Flooded Members in Last Inspection
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            {number_of_flooded_members_in_last_inspection}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DatePicker
                            name={[
                                'flooded_member',
                                'flooded_members_last_inspection_date',
                            ]}
                            label="Flooded Member Last Inspection Date"
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={6} />
                    </Hidden>

                    <Grid item xs={12} md={6}>
                        <DatePicker
                            name={[
                                'flooded_member',
                                'previous_flooded_members_inspection_date',
                            ]}
                            label="Previous Flooded Member Inspection Date"
                            helperText="If not known taken as Platform Installation Date"
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={6} />
                    </Hidden>

                    <Grid item xs={12} md={6}>
                        <TextField
                            name={[
                                'flooded_member',
                                'number_of_previous_inspection_flooded_members',
                            ]}
                            label="Number of Previous Inspection Flooded Members"
                            nullable
                        />
                    </Grid>

                    <Hidden smDown>
                        <Grid item xs={12} md={6} />
                    </Hidden>
                </Grid>
            </Box>
        </ExpansionRow>
    );
}
